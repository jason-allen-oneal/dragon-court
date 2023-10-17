import Layout from "@/components/Layout";

export default function Home() {
  const data = {
    title: "Home",
    description: ""
  };
  
  return (
    <Layout data={data}>
      <div className="mt-8 flex flex-wrap-reverse">
        <div className="alert shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h3 className="font-bold">COMING SOON!</h3>
            <div className="text-xs">I&apos;m workin&apos; on it!</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
