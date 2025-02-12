import { Suspense } from 'react';
import CreateForm from "../gen-cert/_components/form";
import DesktopSidebar from "../../_components/desktop-sidebar";
import RightHeader from "../../_components/right-header";


export default  function CreateCertificatePage() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DesktopSidebar />
        <div className="flex flex-col">
          <RightHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Create Certificate</h1>
            </div>
  
            <div
              className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
  
              
  
              <div className="flex flex-col gap-1 w-full">
              <Suspense>
                <CreateForm />

                </Suspense>
  
  
  
                
  
  
      
    
  
              </div>
            </div>
          </main>
        </div>
      </div>
    )
};