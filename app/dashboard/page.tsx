'use client';

import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    LayoutDashboard, Package, Settings, LogOut, Plus, Coffee, Cake, Sandwich, Bean, Utensils, X, Trash2, ShoppingBag
} from 'lucide-react';

// --- MOCK DATA ---

const salesData = [
    { name: 'Mon', sales: 150000 },
    { name: 'Tue', sales: 230000 },
    { name: 'Wed', sales: 180000 },
    { name: 'Thu', sales: 290000 },
    { name: 'Fri', sales: 450000 },
    { name: 'Sat', sales: 520000 },
    { name: 'Sun', sales: 480000 },
];

const menuItems = [
    {
        id: 1,
        name: 'Caramel Macchiato',
        price: 8500,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80'
    },
    { id: 2, name: 'Java Chip Frappuccino', price: 9200, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
    { id: 3, name: 'Red Velvet Cake', price: 7500, category: 'Cakes', image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&q=80' },
    { id: 4, name: 'New York Cheesecake', price: 8000, category: 'Cakes', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80' },
    { id: 5, name: 'Butter Croissant', price: 4500, category: 'Breads', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80' },
    { id: 6, name: 'Chocolate Muffin', price: 5000, category: 'Breads', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80' },
    { id: 7, name: 'Iced Green Tea Latte', price: 7800, category: 'Drinks', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80' },
    { id: 8, name: 'Blueberry Danish', price: 5500, category: 'Breads', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&q=80' },
];

const tablesData = [
    { id: 1, name: 'Table 01', seats: 2, status: 'Available' },
    { id: 2, name: 'Table 02', seats: 2, status: 'Occupied' },
    { id: 3, name: 'Table 03', seats: 4, status: 'Occupied' },
    { id: 4, name: 'Table 04', seats: 4, status: 'Reserved' },
    { id: 5, name: 'Table 05', seats: 6, status: 'Available' },
    { id: 6, name: 'Table 06', seats: 2, status: 'Available' },
];

const initialStock = [
    { id: 1, name: 'Coffee Beans (Arabica)', stock: 45, unit: 'kg', threshold: 10, status: 'Normal' },
    { id: 2, name: 'Whole Milk', stock: 8, unit: 'Liters', threshold: 15, status: 'Low' },
    { id: 3, name: 'Sugar Syrup', stock: 12, unit: 'Bottles', threshold: 5, status: 'Normal' },
    { id: 4, name: 'Red Velvet Mix', stock: 2, unit: 'kg', threshold: 5, status: 'Critical' },
    { id: 5, name: 'Caramel Sauce', stock: 0, unit: 'Bottles', threshold: 3, status: 'Out of Stock' },
];

export default function Page() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [filter, setFilter] = useState('All');
    const [selectedTable, setSelectedTable] = useState<any>(null);
    const [cart, setCart] = useState<any[]>([]);

    const filteredItems = filter === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === filter);

    // --- POS Logic ---
    const handleSelectTable = (table: any) => {
        setSelectedTable(table);
        setActiveTab('products'); // စားပွဲရွေးပြီးရင် Menu ကို အလိုအလျောက်ပြောင်းမယ်
    };

    const addToCart = (item: any) => {
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter(i => i.id !== id));
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="flex min-h-screen bg-[#FDFCFB]">

            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-white border-r border-stone-100 flex flex-col fixed h-full shadow-sm z-10">
                <div className="p-8">
                    <h2 className="text-2xl font-black text-[#006241] flex items-center gap-2 tracking-tight">
                        <div className="bg-[#006241] p-1.5 rounded-full text-white"><Bean size={20} /></div>
                        STAR CAFÉ
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarItem icon={<LayoutDashboard size={22} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<Package size={22} />} label="Menu Items" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                    <SidebarItem icon={<Utensils size={22} />} label="Tables Plan" active={activeTab === 'tables'} onClick={() => setActiveTab('tables')} />
                    <SidebarItem
                        icon={<Package size={22} />}
                        label="Inventory"
                        active={activeTab === 'stock'}
                        onClick={() => setActiveTab('stock')}
                    />
                    <SidebarItem icon={<Settings size={22} />} label="Store Settings" />
                </nav>

                <div className="p-6 border-t border-stone-50">
                    <button className="flex items-center space-x-3 text-stone-400 p-3 hover:text-red-600 transition w-full">
                        <LogOut size={20} />
                        <span className="font-bold text-sm uppercase tracking-wider">Logout</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className={`flex-1 ml-72 p-10 transition-all duration-500 ${selectedTable ? 'mr-96' : ''}`}>

                {/* --- 1. Dashboard --- */}
                {activeTab === 'dashboard' && (
                    <div className="max-w-6xl animate-in fade-in slide-in-from-top-2 duration-700">
                        <header className="mb-10 flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-black text-stone-900">Morning, Manager!</h1>
                                <p className="text-stone-500 font-medium mt-1">Check your store's performance today.</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Business Date</p>
                                <p className="font-bold text-stone-900">Oct 24, 2024</p>
                            </div>
                        </header>

                        {/* Top Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <StatCard title="Daily Sales" value="2,450,000 Ks" label="+12.5% from yesterday" />
                            <StatCard title="Total Orders" value="156" label="Avg 12 orders/hr" />
                            <StatCard title="Popular" value="Macchiato" label="42 cups sold" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* --- Sales Chart --- */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-black text-stone-800 italic">Revenue Flow</h3>
                                    <select className="text-xs font-bold border-none bg-stone-50 rounded-lg px-3 py-1 outline-none">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={salesData}>
                                            <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#F5F5F4" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A8A29E', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A8A29E', fontSize: 11 }} />
                                            <Tooltip
                                                cursor={{ fill: '#F1F8F5' }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            />
                                            <Bar dataKey="sales" fill="#006241" radius={[6, 6, 6, 6]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* --- Recent Transactions --- */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col">
                                <h3 className="text-xl font-black text-stone-800 italic mb-6">Live Orders</h3>
                                <div className="space-y-6 overflow-y-auto pr-2">
                                    {[
                                        { id: '#1024', time: 'Just now', table: 'Table 02', price: '15,500' },
                                        { id: '#1023', time: '5 mins ago', table: 'Takeaway', price: '8,500' },
                                        { id: '#1022', time: '12 mins ago', table: 'Table 05', price: '22,000' },
                                        { id: '#1021', time: '20 mins ago', table: 'Table 01', price: '12,400' },
                                    ].map((order) => (
                                        <div key={order.id} className="flex justify-between items-center border-b border-stone-50 pb-4 last:border-0">
                                            <div>
                                                <p className="font-black text-stone-900 text-sm">{order.id}</p>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{order.time} • {order.table}</p>
                                            </div>
                                            <p className="font-black text-[#006241]">{order.price} <span className="text-[10px]">Ks</span></p>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-auto pt-6 text-xs font-black text-stone-400 hover:text-[#006241] transition-colors uppercase tracking-widest text-center">
                                    View All History
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 2. Menu Items (POS View) --- */}
                {activeTab === 'products' && (
                    <div className="max-w-7xl animate-in fade-in duration-700">
                        <header className="mb-10 flex justify-between items-center">
                            <div>
                                <h1 className="text-4xl font-black text-stone-900 italic">
                                    {selectedTable ? `Ordering for ${selectedTable.name}` : 'Store Menu'}
                                </h1>
                                <div className="flex gap-3 mt-4">
                                    {['All', 'Drinks', 'Cakes', 'Breads'].map((cat) => (
                                        <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-[#006241] text-white shadow-lg shadow-green-100' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-stone-800 mb-2">{item.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-black text-stone-900">{item.price.toLocaleString()} Ks</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="h-10 w-10 flex items-center justify-center bg-stone-900 text-white rounded-full hover:bg-[#006241] transition-all"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- 3. Tables Plan --- */}
                {activeTab === 'tables' && (
                    <div className="max-w-7xl animate-in fade-in slide-in-from-right-4 duration-500">
                        <header className="mb-10">
                            <h1 className="text-4xl font-black text-stone-900">Floor Plan</h1>
                            <p className="text-stone-500 font-medium">Select a table to start an order.</p>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {tablesData.map((table) => (
                                <button
                                    key={table.id}
                                    onClick={() => handleSelectTable(table)}
                                    className={`bg-white rounded-[2.5rem] border-2 p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-left relative group ${selectedTable?.id === table.id ? 'border-[#006241] bg-[#F1F8F5]' : 'border-stone-100'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full mb-4 ${table.status === 'Available' ? 'bg-green-500' : table.status === 'Occupied' ? 'bg-red-500' : 'bg-orange-400'}`} />
                                    <h3 className="text-2xl font-black text-stone-800">{table.name}</h3>
                                    <p className="text-stone-400 font-bold text-sm uppercase mb-6">{table.seats} Seats</p>
                                    <div className="text-[10px] font-black uppercase text-[#006241]">{table.status === 'Available' ? 'Tap to Open' : 'Tap to View'}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- 4. Stock Management --- */}
                {activeTab === 'stock' && (
                    <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-4xl font-black text-stone-900 italic">Inventory Control</h1>
                                <p className="text-stone-500 font-medium">Monitor and manage your raw materials.</p>
                            </div>
                            <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-stone-800 transition-all flex items-center gap-3 shadow-xl uppercase tracking-tighter text-sm">
                                <Plus size={20} /> Add New Material
                            </button>
                        </header>

                        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-stone-50 border-b border-stone-100">
                                    <tr>
                                        <th className="p-6 text-xs font-black text-stone-400 uppercase tracking-widest">Material Name</th>
                                        <th className="p-6 text-xs font-black text-stone-400 uppercase tracking-widest">Current Stock</th>
                                        <th className="p-6 text-xs font-black text-stone-400 uppercase tracking-widest">Min. Threshold</th>
                                        <th className="p-6 text-xs font-black text-stone-400 uppercase tracking-widest">Status</th>
                                        <th className="p-6 text-xs font-black text-stone-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-50">
                                    {initialStock.map((item) => (
                                        <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                                            <td className="p-6 font-bold text-stone-800">{item.name}</td>
                                            <td className="p-6 font-black text-stone-900">
                                                {item.stock} <span className="text-[10px] text-stone-400 ml-1">{item.unit}</span>
                                            </td>
                                            <td className="p-6 font-bold text-stone-400">{item.threshold} {item.unit}</td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${item.status === 'Normal' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'Low' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="text-[#006241] font-black text-xs hover:underline uppercase tracking-widest">
                                                    Update Stock
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Stock Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 flex items-center gap-6">
                                <div className="bg-orange-500 text-white p-4 rounded-3xl shadow-lg shadow-orange-200">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h4 className="text-orange-900 font-black text-xl tracking-tight">Low Stock Alert</h4>
                                    <p className="text-orange-700 font-bold text-sm">3 items need immediate attention.</p>
                                </div>
                            </div>
                            <div className="bg-[#F1F8F5] p-8 rounded-[2.5rem] border border-[#E3F0E9] flex items-center gap-6">
                                <div className="bg-[#006241] text-white p-4 rounded-3xl shadow-lg shadow-green-100">
                                    <Settings size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[#006241] font-black text-xl tracking-tight">Inventory Health</h4>
                                    <p className="text-[#006241]/70 font-bold text-sm">85% of supplies are in optimal range.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>



            {/* --- RIGHT SIDEBAR (POS Receipt) --- */}
            {selectedTable && (
                <aside className="fixed right-0 top-0 w-96 h-full bg-white border-l border-stone-100 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right-full duration-500">
                    <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-[#FDFCFB]">
                        <div>
                            <h2 className="text-xl font-black text-stone-900 italic">Bill Details</h2>
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em]">{selectedTable.name}</p>
                        </div>
                        <button onClick={() => setSelectedTable(null)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-300 opacity-50">
                                <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                                <p className="font-bold uppercase text-xs tracking-widest">No Items Added</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl group transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100">
                                    <div>
                                        <h5 className="font-bold text-stone-800 text-sm">{item.name}</h5>
                                        <p className="text-xs font-bold text-stone-400">Qty: {item.qty} × {item.price.toLocaleString()} Ks</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-black text-sm text-stone-900">{(item.price * item.qty).toLocaleString()}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-8 border-t border-stone-100 bg-[#FDFCFB]">
                        <div className="space-y-2 mb-6 text-sm font-bold text-stone-500">
                            <div className="flex justify-between"><span>Subtotal</span><span>{totalPrice.toLocaleString()} Ks</span></div>
                            <div className="flex justify-between text-[#006241]"><span>Service Tax (5%)</span><span>{(totalPrice * 0.05).toLocaleString()} Ks</span></div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-black text-stone-900 uppercase tracking-widest text-xs">Total Bill</span>
                            <span className="text-3xl font-black text-stone-900 tracking-tighter">{(totalPrice + (totalPrice * 0.05)).toLocaleString()} <span className="text-sm">Ks</span></span>
                        </div>
                        <button
                            className="w-full bg-[#006241] text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#004d33] transition-all uppercase tracking-widest"
                            onClick={() => { alert('Order Confirmed!'); setCart([]); setSelectedTable(null); }}
                        >
                            Confirm Order & Printout
                        </button>
                    </div>
                </aside>
            )}

        </div>
    );
}

// --- Helper Components ---

function SidebarItem({ icon, label, active = false, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex items-center space-x-4 w-full p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-[#F1F8F5] text-[#006241]' : 'text-stone-500 hover:bg-stone-50'}`}>
            <span className={`${active ? 'scale-110' : ''} transition-transform`}>{icon}</span>
            <span className="font-bold text-[15px]">{label}</span>
        </button>
    );
}

function StatCard({ title, value, label }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-50 hover:shadow-md transition-shadow">
            <p className="text-[11px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">{title}</p>
            <p className="text-3xl font-black text-stone-900 tracking-tighter mb-2">{value}</p>
            <p className="text-xs font-bold text-[#006241] bg-[#F1F8F5] inline-block px-3 py-1 rounded-full">{label}</p>
        </div>
    );
}

function Legend({ label, color }: { label: string, color: string }) {
    return (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            {label}
        </div>
    );
}