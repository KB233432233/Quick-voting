import { useState, useRef } from 'react';
import { Wallet, Mail, Copy, CheckCircle2, Upload, User, Save, Camera, LogOut } from 'lucide-react';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import { useWeb3AuthUser, useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router';

function Profile() {
    const [copied, setCopied] = useState(false);
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    
    const { address: account } = useAccount();
    const { userInfo } = useWeb3AuthUser();
    const { disconnect, loading: disconnectLoading } = useWeb3AuthDisconnect();

    const handleCopy = () => {
        navigator.clipboard.writeText(account);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleLogout = () => {
        disconnect();
        navigate('/signup');
    }

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Saving profile...', { username, profileImage });
        alert('Profile settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-[#F4F6FB] font-sans pb-24 text-slate-800 selection:bg-[#1D58E9]/20 selection:text-[#1D58E9]">
            <main className="max-w-250 mx-auto px-6 pt-12">
                <ProfileHeader />

                <div className="max-w-3xl mx-auto mt-8">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-[#1D58E9]/10 to-transparent"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-[#0B1527] mb-6">Profile Settings</h2>
                            
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="w-28 h-28 rounded-full bg-[#F1F5F9] border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                                            {profileImage ? (
                                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera className="w-10 h-10 text-[#94A3B8]" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-left pt-2">
                                        <h3 className="text-lg font-semibold text-slate-800">Profile Picture</h3>
                                        <p className="text-sm text-slate-500 mb-3">Upload a new avatar. Recommended size: 256x256px.</p>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleImageChange}
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 border border-slate-200 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            Choose Image
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <User className="w-4 h-4" /> Username
                                        </label>
                                        <input 
                                            type="text" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your new username" 
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1D58E9] focus:border-transparent transition-all shadow-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            value={userInfo?.email || ''}
                                            disabled
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 shadow-sm cursor-not-allowed"
                                        />
                                        <p className="text-xs text-slate-400">Email is linked to your Web3Auth account.</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Wallet Address</label>
                                    <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2.5 overflow-hidden">
                                            <Wallet className="w-5 h-5 text-[#94A3B8]" />
                                            <span className="text-[14px] font-mono font-medium text-[#475569]">{account || 'Not connected'}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="p-1.5 hover:bg-[#E2E8F0] rounded-md transition-colors text-[#64748B]"
                                            title="Copy Address"
                                        >
                                            {copied ? <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => handleLogout()}
                                        disabled={disconnectLoading}
                                        className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-3 rounded-xl font-semibold transition-all active:scale-[0.98]"
                                    >
                                        <LogOut className="w-5 h-5" /> {disconnectLoading ? 'Logging out...' : 'Log Out'}
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex items-center justify-center gap-2 bg-[#1D58E9] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        <Save className="w-5 h-5" /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
