import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  
  
  
  Key, 
  
  Webhook,
  Plus,
  Edit,
  Trash2,
  Search,



  MoreHorizontal
} from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@acme-corp.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-16T14:30:00Z',
    organizations: ['acme-corp', 'tech-startup'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@acme-corp.com',
    role: 'DevOps',
    status: 'active',
    lastLogin: '2024-01-16T10:15:00Z',
    organizations: ['acme-corp'],
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@tech-startup.com',
    role: 'Developer',
    status: 'active',
    lastLogin: '2024-01-15T16:45:00Z',
    organizations: ['tech-startup'],
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'Alice Johnson',
    email: 'alice@enterprise-co.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-10T09:20:00Z',
    organizations: ['enterprise-co'],
    createdAt: '2024-01-12T00:00:00Z'
  }
];

const apiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'dp_prod_1234567890abcdef',
    permissions: ['read', 'write', 'admin'],
    lastUsed: '2024-01-16T14:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'dp_dev_abcdef1234567890',
    permissions: ['read', 'write'],
    lastUsed: '2024-01-15T10:15:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    status: 'active'
  }
];

const webhooks = [
  {
    id: '1',
    name: 'Deployment Notifications',
    url: 'https://api.acme-corp.com/webhooks/deployments',
    events: ['deployment.created', 'deployment.updated', 'deployment.failed'],
    status: 'active',
    lastTriggered: '2024-01-16T14:30:00Z'
  },
  {
    id: '2',
    name: 'Cost Alerts',
    url: 'https://api.tech-startup.com/webhooks/costs',
    events: ['cost.threshold_reached', 'cost.budget_exceeded'],
    status: 'active',
    lastTriggered: '2024-01-16T12:20:00Z'
  }
];

function Settings() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your platform configuration, users, and integrations.</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Users & RBAC</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new user to join your organization.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="user@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizations">Organizations</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organizations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme-corp">Acme Corp</SelectItem>
                        <SelectItem value="tech-startup">Tech Startup</SelectItem>
                        <SelectItem value="enterprise-co">Enterprise Co</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Send Invitation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage user access and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.organizations.map((org, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {org}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deployment Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when deployments succeed or fail</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cost Alerts</Label>
                    <p className="text-sm text-gray-500">Receive alerts when budgets are exceeded</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Performance Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about performance issues</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Receive weekly summary reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="notifications@company.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>Slack Webhook URL</Label>
                    <Input placeholder="https://hooks.slack.com/services/..." className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
              <p className="text-sm text-gray-500">Manage API keys for programmatic access</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key for programmatic access to the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input id="key-name" placeholder="Production API Key" />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="read" className="rounded" />
                        <Label htmlFor="read">Read access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="write" className="rounded" />
                        <Label htmlFor="write">Write access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="admin" className="rounded" />
                        <Label htmlFor="admin">Admin access</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Key</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-6 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Key className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                        <p className="text-sm font-mono text-gray-500">{apiKey.key}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {apiKey.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm text-gray-500">
                        <p>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</p>
                        <p>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Webhooks</h3>
              <p className="text-sm text-gray-500">Configure webhook endpoints for real-time notifications</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-1">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="flex items-center justify-between p-6 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Webhook className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                        <p className="text-sm text-gray-500 font-mono">{webhook.url}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {webhook.events.slice(0, 2).map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                          {webhook.events.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{webhook.events.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                          {webhook.status}
                        </Badge>
                        <p className="text-gray-500 mt-1">
                          Last: {new Date(webhook.lastTriggered).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your platform preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="DataOps Platform" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="default-region">Default AWS Region</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select default region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                      <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" className="mt-1" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Auto-scaling</Label>
                    <p className="text-sm text-gray-500">Automatically scale components based on demand</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cost Optimization</Label>
                    <p className="text-sm text-gray-500">Enable automatic cost optimization recommendations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Settings;