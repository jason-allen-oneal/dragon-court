import { getServerSession } from "next-auth/next";
import nextAuthOptions from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { prisma } from "@/lib/prisma";
import Item from "@/lib/models/Item";

import {UserProvider} from "@/lib/context/user";
import {PlayerProvider} from "@/lib/context/player";
import {InventoryProvider} from "@/lib/context/inventory";
import {RegionProvider} from "@/lib/context/region";
import {BuildingProvider} from "@/lib/context/building";
import {EncounterProvider} from "@/lib/context/encounter";
import {CharacterProvider} from "@/lib/context/character";
import {ModalProvider} from "@/lib/context/modal";
import Layout from "@/components/Layout";
import CharacterCreation from "@/components/game/CharacterCreation";
import GameDisplay from "@/components/game/GameDisplay";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);
  
  const user = await prisma.user.findFirst({
    where: {
      id: session!.user!.id,
    },
  });
  
  const player = await prisma.player.findFirst({
    where: {
      owner: user.id
    },
    include: {
      PlayerItem: {
        include: {
          Item: true,
        }
      }
    }
  });
  
  const clan = await prisma.clan.findFirst({
    where: {
      id: player.clanId
    }
  });
  
  player.name = user.name;
  
  const inventory: any[] = [];
  const equipment = [];
  for(const item of player.PlayerItem) {
    const i = {
      id: item.id,
      itemId: item.Item.id,
      name: item.Item.name,
      attack: item.attack + item.Item.attack,
      defend: item.defend + item.Item.defend,
      skill: item.skill + item.Item.skill,
      location: item.Item.location,
      traits: (item.traits.length > 0) ? item.traits+","+item.Item.traits : item.Item.traits,
      equippable: item.Item.equippable,
      type: item.Item.type,
      cost: item.Item.cost,
      playerId: item.playerId,
      qty: item.qty,
      equipped: item.equipped,
      identified: item.identified,
      enchants: item.enchants,
      stored: item.stored,
      guts: item.guts,
      wits: item.wits,
      charm: item.charm,
    };
    
    i.traits = i.traits.split(",");
    i.traits = i.traits.filter((item: any, index: number) => i.traits.indexOf(item) === index);
    
    if(i.equipped){
      equipment.push(i);
    }else{
      inventory.push(i);
    }
  }
  
  delete player.PlayerItem;
  
  return {
    props: {
      session: session,
      u: user,
      p: player,
      inventory: inventory,
      equipment: equipment,
      clan: clan,
    },
  }
}

export default function Game({u, p, inventory, clan, equipment}: {u: any, p: any, inventory: any[], clan: any, equipment: any[]}) {
  const { data: session } = useSession();
  const [user, setUser] = useState(u);
  const [player, setPlayer] = useState(p);
  
  let data = {
    title: "",
    description: ""
  };
  
  if(!player || player.id === 0){
    data = {
      title: "Create Character",
      description: ""
    };
    
    return (
      <Layout data={data}>
        <CharacterCreation uid={user.id} setPlayer={setPlayer} setUser={setUser} />
      </Layout>
    );
  }else{
    data = {
      title: "PLAY!",
      description: ""
    };
    
    let items = [];
    for(const item of inventory){
      const i = Item.init();
      items.push(i);
    }
    
    let equip = {
    equipped: {
      head: null,
      body: null,
      feet: null,
      right: null,
      left: null,
    },
    attack: 0,
    defend: 0,
    skill: 0,
    traits: [],
  };
  
  for(const item of equipment) {
    if(item.equipped){
      equip.equipped[item.location] = Item.init(item);
    }
  }
    
    return (
      <Layout data={data}>
        <ModalProvider>
          <UserProvider>
            <InventoryProvider>
              <PlayerProvider>
                <EncounterProvider>
                  <RegionProvider>
                    <BuildingProvider>
                      <CharacterProvider>
                        <GameDisplay user={user} p={player} i={items} e={equip} clan={clan} />
                      </CharacterProvider>
                    </BuildingProvider>
                  </RegionProvider>
                </EncounterProvider>
              </PlayerProvider>
            </InventoryProvider>
          </UserProvider>
        </ModalProvider>
      </Layout>
    );
  }
}
