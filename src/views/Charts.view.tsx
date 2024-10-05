import LinealChart from "@/components/Charts/LinealChart";

export default function Charts() {
  return (
    <div className="mt-2 h-full">
    
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center w-full mb-4 rounded bg-gray-50 h-[700px] dark:bg-gray-800 ">
         <LinealChart className=" mx-auto" id="charts"/>
         <LinealChart className=" mx-auto" id="charts2"/>
      </div>
    
      </div>
  )
}
