import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-[#080808]">
      <div className="p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col md:flex-row justify-between gap-12 relative z-10 w-full mx-auto">
        <div className="flex flex-col max-w-[280px]">
          <Link to="/" className="inline-block mb-6 w-fit">
            <div className="w-[24px] h-[24px] rounded-full border-2 border-transparent bg-white flex items-center justify-center overflow-hidden relative hover:scale-110 transition-transform" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'}}>
              <div className="absolute inset-x-0 bottom-0 top-[15%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
              <div className="absolute inset-x-0 bottom-0 top-[35%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
              <div className="absolute inset-x-0 bottom-0 top-[55%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
              <div className="absolute inset-x-0 bottom-0 top-[75%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,1)]"></div>
            </div>
          </Link>
          <p className="text-[#a1a1aa] text-[13px] leading-relaxed mb-6 font-medium">Build the best software with the best IDE.</p>
          <div className="flex items-center gap-4 text-gray-500 text-[13px]">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">GitHub</a>
             <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 lg:gap-x-20">
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-medium text-[13px]">Product</h5>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px]">
              <Link to="/features" className="hover:text-gray-300 transition-colors">Features</Link>
              <Link to="/templates" className="hover:text-gray-300 transition-colors">Templates</Link>
              <Link to="/compute" className="hover:text-gray-300 transition-colors">Compute</Link>
              <Link to="/integrations" className="hover:text-gray-300 transition-colors">Integrations</Link>
              <Link to="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
              <Link to="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
              <Link to="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-medium text-[13px]">Company</h5>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px]">
              <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
              <Link to="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
              <Link to="/careers" className="hover:text-gray-300 transition-colors">Careers</Link>
              <a href="#" className="hover:text-gray-300 transition-colors">Customers</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Brand</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-medium text-[13px]">Resources</h5>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px]">
              <Link to="/community" className="hover:text-gray-300 transition-colors">Community</Link>
              <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
              <a href="#" className="hover:text-gray-300 transition-colors">DPA</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of service</a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-medium text-[13px]">Developers</h5>
            <div className="flex flex-col gap-3 text-gray-500 text-[13px]">
              <Link to="/dashboard/projects" className="hover:text-gray-300 transition-colors">Projects Console</Link>
              <Link to="/dashboard/settings" className="hover:text-gray-300 transition-colors">Account Settings</Link>
              <a href="#" className="hover:text-gray-300 transition-colors">API Details</a>
              <a href="#" className="hover:text-gray-300 transition-colors">GitHub</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Packages</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
