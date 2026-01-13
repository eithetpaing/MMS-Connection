'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, Package, Settings, LogOut, Plus, Coffee, Cake, Sandwich, Bean
} from 'lucide-react';

// Daily Sales Data
const salesData = [
  { name: 'Mon', sales: 150000 },
  { name: 'Tue', sales: 230000 },
  { name: 'Wed', sales: 180000 },
  { name: 'Thu', sales: 290000 },
  { name: 'Fri', sales: 450000 },
  { name: 'Sat', sales: 520000 },
  { name: 'Sun', sales: 480000 },
];

// Cafe Menu Data (Cakes, Breads, Drinks)
const menuItems = [
  { id: 1, name: 'Caramel Macchiato', price: 8500, category: 'Drinks', image: 'https://images.unsplash.com/photo-1485808191679-5f6333c37c8a?w=500&q=80' },
  { id: 2, name: 'Java Chip Frappuccino', price: 9200, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
  { id: 3, name: 'Red Velvet Cake', price: 7500, category: 'Cakes', image: 'https://images.unsplash.com/photo-1586788680434-30d324671ff6?w=500&q=80' },
  { id: 4, name: 'New York Cheesecake', price: 8000, category: 'Cakes', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80' },
  { id: 5, name: 'Butter Croissant', price: 4500, category: 'Breads', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80' },
  { id: 6, name: 'Chocolate Muffin', price: 5000, category: 'Breads', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80' },
  { id: 7, name: 'Iced Green Tea Latte', price: 7800, category: 'Drinks', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80' },
  { id: 8, name: 'Blueberry Danish', price: 5500, category: 'Breads', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&q=80' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('All');

  // Filter items based on category
  const filteredItems = filter === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-stone-100 flex flex-col fixed h-full shadow-sm z-10">
        <div className="p-8">
          <h2 className="text-2xl font-black text-[#006241] flex items-center gap-2 tracking-tight">
            <div className="bg-[#006241] p-1.5 rounded-full text-white"><Bean size={20}/></div>
            STAR CAFÉ
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard size={22}/>} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Package size={22}/>} 
            label="Menu Management" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarItem icon={<Settings size={22}/>} label="Store Settings" />
        </nav>

        <div className="p-6 border-t border-stone-50">
          <button className="flex items-center space-x-3 text-stone-400 p-3 hover:text-red-600 transition w-full">
            <LogOut size={20}/>
            <span className="font-bold text-sm uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-72 p-10">
        
        {/* --- Dashboard Content --- */}
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl animate-in fade-in slide-in-from-top-2 duration-700">
            <header className="mb-10">
              <h1 className="text-4xl font-black text-stone-900">Morning, Manager!</h1>
              <p className="text-stone-500 font-medium">Here's what's happening at your store today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <StatCard title="Daily Sales" value="2,450,000 Ks" label="Total Revenue" />
              <StatCard title="Total Orders" value="156" label="Transactions" />
              <StatCard title="Popular" value="Macchiato" label="Best Seller" />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-50">
              <h3 className="text-xl font-bold mb-8 text-stone-800">Weekly Revenue (Ks)</h3>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#F5F5F4" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#A8A29E', fontSize: 14}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#A8A29E', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#F1F8F5'}} 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                    />
                    <Bar dataKey="sales" fill="#006241" radius={[10, 10, 10, 10]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* --- Menu Items Content --- */}
        {activeTab === 'products' && (
          <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-black text-stone-900 italic">Store Menu</h1>
                <div className="flex gap-3 mt-4">
                  {['All', 'Drinks', 'Cakes', 'Breads'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        filter === cat ? 'bg-[#006241] text-white shadow-lg shadow-green-100' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button className="bg-[#006241] text-white px-8 py-4 rounded-full font-bold hover:bg-[#004d33] transition-all flex items-center gap-3 shadow-xl shadow-green-200 uppercase tracking-tighter text-sm">
                <Plus size={20}/> New Item
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-[#006241] uppercase tracking-widest shadow-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-stone-800 leading-tight mb-4">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-stone-900 tracking-tighter">
                        {item.price.toLocaleString()} <span className="text-sm font-bold text-stone-400">Ks</span>
                      </span>
                      <button className="h-10 w-10 flex items-center justify-center border-2 border-stone-900 rounded-full group-hover:bg-stone-900 group-hover:text-white transition-all">
                        <Plus size={20}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- Helper Components ---

function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-4 w-full p-4 rounded-2xl transition-all duration-300 ${
        active 
          ? 'bg-[#F1F8F5] text-[#006241]' 
          : 'text-stone-500 hover:bg-stone-50'
      }`}
    >
      <span className={`${active ? 'scale-110' : ''} transition-transform duration-300`}>{icon}</span>
      <span className={`font-bold text-[15px] ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
    </button>
  );
}

function StatCard({ title, value, label }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-stone-50">
      <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-3xl font-black text-stone-900 tracking-tighter mb-2">{value}</p>
      <p className="text-xs font-bold text-[#006241] bg-[#F1F8F5] inline-block px-3 py-1 rounded-full">{label}</p>
    </div>
  );
}