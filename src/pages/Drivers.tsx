import { Users, Star, Car, ShieldCheck } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/common';
import { cn } from '../components/common';

const MOCK_DRIVERS = [
  { id: 1, name: 'Rahul Sharma', rating: 4.9, rides: 1243, status: 'Active', vehicle: 'Maruti Suzuki Dzire', joinDate: '2023-01-15' },
  { id: 2, name: 'Priya Patel', rating: 4.8, rides: 892, status: 'Active', vehicle: 'Hyundai i20', joinDate: '2023-03-22' },
  { id: 3, name: 'Amit Kumar', rating: 4.5, rides: 2150, status: 'Offline', vehicle: 'Toyota Etios', joinDate: '2022-11-05' },
  { id: 4, name: 'Sneha Gupta', rating: 4.9, rides: 430, status: 'Active', vehicle: 'Tata Nexon', joinDate: '2023-08-10' },
  { id: 5, name: 'Vikram Singh', rating: 4.2, rides: 3211, status: 'Suspended', vehicle: 'Honda Amaze', joinDate: '2021-06-18' },
];

export const Drivers = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Drivers Management</h1>
          <p className="text-textSecondary">Monitor driver activity, performance metrics, and compliance status.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center space-x-4 p-4 border border-border bg-surface">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-textSecondary">Total Drivers</p>
              <h3 className="text-2xl font-bold text-white">4,281</h3>
            </div>
          </Card>
          <Card className="flex items-center space-x-4 p-4 border border-border bg-surface">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-textSecondary">Active Now</p>
              <h3 className="text-2xl font-bold text-white">1,842</h3>
            </div>
          </Card>
          <Card className="flex items-center space-x-4 p-4 border border-border bg-surface">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-textSecondary">Avg Rating</p>
              <h3 className="text-2xl font-bold text-white">4.72</h3>
            </div>
          </Card>
          <Card className="flex items-center space-x-4 p-4 border border-border bg-surface">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-textSecondary">Compliance Rate</p>
              <h3 className="text-2xl font-bold text-white">98.5%</h3>
            </div>
          </Card>
        </div>

        {/* Drivers Table */}
        <Card className="flex flex-col border border-border bg-surface">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-white">Recent Driver Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-textSecondary uppercase bg-surfaceHighlight border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Driver Name</th>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Rating</th>
                  <th className="px-6 py-4 font-medium">Total Rides</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DRIVERS.map((driver) => (
                  <tr 
                    key={driver.id} 
                    className="border-b border-border last:border-0 hover:bg-surfaceHighlight/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">{driver.name}</td>
                    <td className="px-6 py-4 text-textSecondary">{driver.vehicle}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-yellow-500">
                        <span className="mr-1">{driver.rating}</span>
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-textSecondary">{driver.rides.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 text-xs font-medium rounded-full",
                        driver.status === 'Active' && "bg-green-500/10 text-green-500 border border-green-500/20",
                        driver.status === 'Offline' && "bg-gray-500/10 text-gray-400 border border-gray-500/20",
                        driver.status === 'Suspended' && "bg-red-500/10 text-red-500 border border-red-500/20",
                      )}>
                        {driver.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};
