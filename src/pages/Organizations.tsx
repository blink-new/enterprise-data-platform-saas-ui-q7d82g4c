import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Plus, 
  Search, 
  Users, 
  DollarSign, 
  Server,
  Settings,
  MoreHorizontal,
  Globe,
  Clock
} from 'lucide-react';

const organizations = [
  {
    id: '1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    users: 12,
    environments: 3,
    monthlySpend: 1247.32,
    status: 'active',
    region: 'us-east-1',
    createdAt: '2024-01-15',
    plan: 'Enterprise'
  },
  {
    id: '2',
    name: 'Tech Startup Inc',
    slug: 'tech-startup',
    users: 8,
    environments: 2,
    monthlySpend: 687.90,
    status: 'active',
    region: 'us-west-2',
    createdAt: '2024-02-03',
    plan: 'Professional'
  },
  {
    id: '3',
    name: 'Enterprise Co',
    slug: 'enterprise-co',
    users: 45,
    environments: 5,
    monthlySpend: 3421.15,
    status: 'active',
    region: 'eu-west-1',
    createdAt: '2023-11-22',
    plan: 'Enterprise'
  },
  {
    id: '4',
    name: 'DevOps Team',
    slug: 'devops-team',
    users: 3,
    environments: 1,
    monthlySpend: 156.40,
    status: 'trial',
    region: 'us-east-1',
    createdAt: '2024-03-10',
    plan: 'Trial'
  }
];

const environments = [
  { name: 'production', deployments: 15, cost: '$890.20', status: 'healthy' },
  { name: 'staging', deployments: 8, cost: '$234.50', status: 'healthy' },
  { name: 'development', deployments: 12, cost: '$156.80', status: 'warning' }
];

function Organizations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-1">Manage your organizations, environments, and team access.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                Set up a new organization to manage your data platform resources.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-slug">Slug</Label>
                <Input id="org-slug" placeholder="acme-corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Default Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button>Create Organization</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organizations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Organizations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredOrgs.map((org) => (
                  <div
                    key={org.id}
                    className={`p-4 cursor-pointer border-l-4 transition-colors ${
                      selectedOrg.id === org.id
                        ? 'bg-blue-50 border-l-blue-500'
                        : 'border-l-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedOrg(org)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{org.name}</h3>
                          <p className="text-sm text-gray-500">{org.slug}</p>
                        </div>
                      </div>
                      <Badge variant={org.status === 'active' ? 'default' : 'secondary'}>
                        {org.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <span>{org.users} users</span>
                      <span>${org.monthlySpend.toFixed(2)}/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Organization Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedOrg.name}</CardTitle>
                      <CardDescription>{selectedOrg.slug}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedOrg.users}</div>
                    <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedOrg.environments}</div>
                    <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                      <Server className="h-4 w-4 mr-1" />
                      Environments
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${selectedOrg.monthlySpend.toFixed(0)}</div>
                    <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Monthly Spend
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {selectedOrg.plan}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                      Plan
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {selectedOrg.region}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Created {selectedOrg.createdAt}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Environments</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Environment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {environments.map((env, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`h-3 w-3 rounded-full ${
                          env.status === 'healthy' ? 'bg-green-500' :
                          env.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{env.name}</h4>
                          <p className="text-sm text-gray-500">{env.deployments} deployments</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{env.cost}</div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organizations;