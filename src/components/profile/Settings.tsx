/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSignOutAlt, 
    faLock, 
    faTrashAlt,
    faUserCog,
    faBell,
    faPalette,
    faLanguage,
    faSpinner,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import { updatePassword, deleteUser } from '../../services/api';

interface PasswordFields {
    current: string;
    new: string;
    confirm: string;
}

interface SettingsProps {
    // Add any props if needed
}

const Settings: React.FC<SettingsProps> = () => {
    const { logout, user, fetchUserData } = useData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('general');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<PasswordFields>({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
        delete: false
    });
    const [confirmUnderstand, setConfirmUnderstand] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
    const [isSessionValid, setIsSessionValid] = useState<boolean>(true);
    const deleteConfirmRef = useRef<HTMLDivElement>(null);
    const firstPasswordRef = useRef<HTMLInputElement>(null);

    // Verify session before sensitive operations
    const verifySession = async () => {
        try {
            await fetchUserData();
            return true;
        } catch (error) {
            setIsSessionValid(false);
            toast.error('Your session has expired. Please login again.');
            handleLogout();
            return false;
        }
    };

    // Handle logout
    const handleLogout = () => {
        Cookies.remove('token');
        logout();
        navigate('/login');
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Handle password change
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!(await verifySession())) return;

        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords don't match");
            return;
        }

        if (passwords.new.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setIsChangingPassword(true);
        const toastId = toast.loading('Changing password...');

        try {
            const response = await updatePassword({
                currentPassword: passwords.current,
                newPassword: passwords.new
            });

            if (response.data?.success) {
                toast.update(toastId, {
                    render: 'Password changed successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });
                setPasswords({ current: '', new: '', confirm: '' });
                setShowPasswordForm(false);
            } else {
                throw new Error(response.data?.message || 'Password change failed');
            }
        } catch (error: any) {
            console.error('Password change error:', error);
            toast.update(toastId, {
                render: error.response?.data?.message || 
                      error.message || 
                      'Error changing password',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        } finally {
            setIsChangingPassword(false);
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        if (!confirmUnderstand || !confirmPassword) return;
        
        if (!(await verifySession())) return;

        setIsDeleting(true);
        const toastId = toast.loading('Deleting your account...');

        try {
            const response = await deleteUser(confirmPassword);
            
            if (!response.data?.success) {
                throw new Error(response.data?.message || 'Account deletion failed');
            }

            // Clear all client-side data
            Cookies.remove('token');
            localStorage.clear();
            sessionStorage.clear();
            
            // Reset application state
            logout();
            
            // Show success and redirect
            toast.update(toastId, {
                render: 'Account deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });

            // Force full navigation reset
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error: any) {
            console.error('Account deletion error:', error);
            setIsDeleting(false);
            toast.dismiss(toastId);
            
            if (error.response?.status === 401 || error.response?.status === 404) {
                // Token is invalid or user already deleted
                Cookies.remove('token');
                logout();
                window.location.href = '/login';
                return;
            }

            toast.error(error.response?.data?.message || 
                        error.message ||
                        'Account deletion failed. Please try again.');
        }
    };

    // Close modal when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(e.target as Node)) {
                setShowDeleteConfirm(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowDeleteConfirm(false);
            }
        };

        if (showDeleteConfirm) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showDeleteConfirm]);

    // Focus first password field when form opens
    useEffect(() => {
        if (showPasswordForm && firstPasswordRef.current) {
            firstPasswordRef.current.focus();
        }
    }, [showPasswordForm]);

    return (
        <div className="bg-white  max-w-4xl mx-auto  p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 border-2">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                {/* Settings Sidebar */}
                <nav className="w-full md:w-1/3 space-y-2" aria-label="Settings navigation">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'general' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        aria-current={activeTab === 'general' ? 'page' : undefined}
                    >
                        <FontAwesomeIcon icon={faUserCog} className="mr-3" />
                        General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'security' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        aria-current={activeTab === 'security' ? 'page' : undefined}
                    >
                        <FontAwesomeIcon icon={faLock} className="mr-3" />
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        aria-current={activeTab === 'notifications' ? 'page' : undefined}
                    >
                        <FontAwesomeIcon icon={faBell} className="mr-3" />
                        Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('appearance')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'appearance' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        aria-current={activeTab === 'appearance' ? 'page' : undefined}
                    >
                        <FontAwesomeIcon icon={faPalette} className="mr-3" />
                        Appearance
                    </button>
                    <button
                        onClick={() => setActiveTab('language')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'language' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        aria-current={activeTab === 'language' ? 'page' : undefined}
                    >
                        <FontAwesomeIcon icon={faLanguage} className="mr-3" />
                        Language
                    </button>
                </nav>

                {/* Settings Content */}
                <main className="w-full md:w-2/3">
                    {activeTab === 'general' && (
                        <section aria-labelledby="general-settings-heading">
                            <h2 id="general-settings-heading" className="text-xl font-semibold mb-4">General Settings</h2>
                            <div className="space-y-4">
                                <div className="p-4 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Account Information</h3>
                                    <p className="text-gray-600">Email: {user?.email}</p>
                                    <p className="text-gray-600">Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'security' && (
                        <section aria-labelledby="security-settings-heading">
                            <h2 id="security-settings-heading" className="text-xl font-semibold mb-4">Security Settings</h2>
                            <div className="space-y-4">
                                {!showPasswordForm ? (
                                    <button
                                        onClick={() => setShowPasswordForm(true)}
                                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
                                        aria-expanded={showPasswordForm}
                                        aria-controls="password-change-form"
                                    >
                                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                                        Change Password
                                    </button>
                                ) : (
                                    <form 
                                        onSubmit={handlePasswordChange} 
                                        id="password-change-form"
                                        className="p-4 border border-gray-200 rounded-lg space-y-4"
                                    >
                                        <div>
                                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="current-password"
                                                    type={showPassword.current ? "text" : "password"}
                                                    value={passwords.current}
                                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    required
                                                    ref={firstPasswordRef}
                                                    aria-describedby="current-password-help"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('current')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    aria-label={showPassword.current ? "Hide password" : "Show password"}
                                                >
                                                    <FontAwesomeIcon icon={showPassword.current ? faEyeSlash : faEye} />
                                                </button>
                                            </div>
                                            <p id="current-password-help" className="text-xs text-gray-500 mt-1">
                                                Enter your current password
                                            </p>
                                        </div>
                                        <div>
                                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="new-password"
                                                    type={showPassword.new ? "text" : "password"}
                                                    value={passwords.new}
                                                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    required
                                                    minLength={8}
                                                    aria-describedby="new-password-help"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    aria-label={showPassword.new ? "Hide password" : "Show password"}
                                                >
                                                    <FontAwesomeIcon icon={showPassword.new ? faEyeSlash : faEye} />
                                                </button>
                                            </div>
                                            <p id="new-password-help" className="text-xs text-gray-500 mt-1">
                                                Must be at least 8 characters long
                                            </p>
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="confirm-password"
                                                    type={showPassword.confirm ? "text" : "password"}
                                                    value={passwords.confirm}
                                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                                                >
                                                    <FontAwesomeIcon icon={showPassword.confirm ? faEyeSlash : faEye} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                                                disabled={isChangingPassword}
                                            >
                                                {isChangingPassword ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                                        Updating...
                                                    </>
                                                ) : 'Update Password'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPasswordForm(false);
                                                    setPasswords({ current: '', new: '', confirm: '' });
                                                }}
                                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                                    <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
                                    <p className="text-red-600 text-sm mb-3">These actions are irreversible. Proceed with caution.</p>
                                    <button
                                        onClick={() => setShowDeleteConfirm(true)}
                                        className="flex items-center text-red-600 hover:text-red-800 transition"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'notifications' && (
                        <section aria-labelledby="notifications-settings-heading">
                            <h2 id="notifications-settings-heading" className="text-xl font-semibold mb-4">Notification Preferences</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Email Notifications</h3>
                                        <p className="text-sm text-gray-600">Receive updates via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'appearance' && (
                        <section aria-labelledby="appearance-settings-heading">
                            <h2 id="appearance-settings-heading" className="text-xl font-semibold mb-4">Appearance</h2>
                            <div className="space-y-4">
                                <div className="p-3 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Theme</h3>
                                    <div className="flex gap-4">
                                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                                            Light
                                        </button>
                                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                                            Dark
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'language' && (
                        <section aria-labelledby="language-settings-heading">
                            <h2 id="language-settings-heading" className="text-xl font-semibold mb-4">Language & Region</h2>
                            <div className="space-y-4">
                                <div className="p-3 border border-gray-200 rounded-lg">
                                    <h3 className="font-medium mb-2">Language</h3>
                                    <select className="w-full p-2 border border-gray-300 rounded-md">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </button>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteConfirm && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-account-modal-heading"
                >
                    <div 
                        ref={deleteConfirmRef}
                        className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in"
                    >
                        <h3 id="delete-account-modal-heading" className="text-xl font-bold text-red-600 mb-3">
                            Confirm Account Deletion
                        </h3>
                        <p className="mb-4 text-gray-700">
                            This will permanently delete your account and all associated data. 
                            You won't be able to recover any information.
                        </p>
                        
                        <div className="space-y-3">
                            <label className="flex items-start space-x-2">
                                <input 
                                    type="checkbox" 
                                    checked={confirmUnderstand}
                                    onChange={() => setConfirmUnderstand(!confirmUnderstand)}
                                    className="mt-1"
                                    aria-describedby="understand-description"
                                />
                                <span id="understand-description">I understand this action cannot be undone</span>
                            </label>
                            
                            <div>
                                <label htmlFor="confirm-delete-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Enter your password to confirm
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirm-delete-password"
                                        type={showPassword.delete ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                        aria-describedby="confirm-password-help"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('delete')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        aria-label={showPassword.delete ? "Hide password" : "Show password"}
                                    >
                                        <FontAwesomeIcon icon={showPassword.delete ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                <p id="confirm-password-help" className="text-xs text-gray-500 mt-1">
                                    Enter your current password to confirm deletion
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setConfirmUnderstand(false);
                                    setConfirmPassword('');
                                }}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={!confirmUnderstand || !confirmPassword || isDeleting}
                                className={`px-4 py-2 rounded-md text-white ${
                                    (!confirmUnderstand || !confirmPassword || isDeleting)
                                        ? 'bg-red-300 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                }`}
                            >
                                {isDeleting ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete My Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;