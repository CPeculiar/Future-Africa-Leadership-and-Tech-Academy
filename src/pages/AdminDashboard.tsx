import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Mail,
  Phone,
  CreditCard,
  RefreshCw,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import Firebase functions
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; 

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Stats calculation
  const stats = {
    total: payments.length,
    successful: payments.filter(p => p.status === 'success').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount: payments
      .filter(p => p.status === 'success')
      .reduce((sum, p) => sum + (p.amount || 0), 0)
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Fetch payments from Firebase on component mount
  useEffect(() => {
    fetchPayments();
    
    // Set up real-time listener for payments
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to Date object
        createdAt: doc.data().createdAt?.toDate() || new Date(doc.data().savedAt) || new Date()
      }));
      
      console.log('Fetched payments from Firebase:', paymentsData);
      setPayments(paymentsData);
    }, (error) => {
      console.error('Error listening to payments:', error);
      setError('Failed to fetch payments in real-time');
      
      // Fallback to localStorage if Firebase fails
      loadFromLocalStorage();
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Load from localStorage as fallback
  const loadFromLocalStorage = () => {
    try {
      const localPayments = JSON.parse(localStorage.getItem('falata_payments') || '[]');
      const backupPayments = JSON.parse(localStorage.getItem('falata_payments_backup') || '[]');
      
      const allLocalPayments = [...localPayments, ...backupPayments].map(payment => ({
        ...payment,
        createdAt: new Date(payment.createdAt || payment.savedAt || Date.now())
      }));
      
      if (allLocalPayments.length > 0) {
        setPayments(allLocalPayments);
        console.log('Loaded payments from localStorage:', allLocalPayments.length);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  // Filter payments based on search and filters
  useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        (payment.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.customerEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.customerPhone || '').includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(payment => 
            new Date(payment.createdAt) >= filterDate
          );
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(payment => 
            new Date(payment.createdAt) >= filterDate
          );
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(payment => 
            new Date(payment.createdAt) >= filterDate
          );
          break;
      }
    }

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, dateFilter]);

  // Function to fetch payments from Firebase
  const fetchPayments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(paymentsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to Date object
        createdAt: doc.data().createdAt?.toDate() || new Date(doc.data().savedAt) || new Date()
      }));
      
      setPayments(paymentsData);
      console.log('Fetched payments:', paymentsData.length);
      
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Failed to fetch payments from Firebase');
      
      // Fallback to localStorage
      loadFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Transaction ID',
      'Customer Name',
      'Email',
      'Phone',
      'Amount (NGN)',
      'Status',
      'Message',
      'Response',
      'Date',
      'Time',
      'Trans ID',
      'Reference'
    ];

    const csvData = filteredPayments.map(payment => [
      payment.transactionId || '',
      payment.customerName || '',
      payment.customerEmail || '',
      payment.customerPhone || '',
      payment.amount || 0,
      payment.status || '',
      payment.message || '',
      payment.response || '',
      new Date(payment.createdAt).toLocaleDateString(),
      new Date(payment.createdAt).toLocaleTimeString(),
      payment.trans || '',
      payment.reference || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `falata_payments_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Dashboard</h1>
              <p className="text-gray-600 mt-1">FALATA Tech Academy - Payment Records</p>
              {currentUser && (
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  Logged in as: {currentUser.email}
                </div>
              )}
              {error && (
                <p className="text-red-600 text-sm mt-1">⚠️ {error}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchPayments}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">₦{stats.totalAmount.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">₦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="success">Successful</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="sm:w-48">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.customerName || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {payment.customerEmail || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {payment.customerPhone || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {payment.transactionId || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Trans: {payment.trans || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.message || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₦{(payment.amount || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.currency || 'NGN'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'Unknown'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {payment.response || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <div>
                          <div>{new Date(payment.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs">{new Date(payment.createdAt).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No payments found</div>
              <div className="text-gray-400 text-sm mt-2">
                {payments.length === 0 ? 'No payment records available' : 'Try adjusting your search or filter criteria'}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-4" />
              <div className="text-gray-500 text-lg">Loading payments...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;