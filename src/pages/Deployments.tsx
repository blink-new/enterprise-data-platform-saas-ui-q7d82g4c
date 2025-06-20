import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Play, 
  Pause, 
  RotateCcw, 
  Trash2,
  ExternalLink,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';

const deployments = [
  {
    id: '1',
    name: 'trino-production',
    component: 'Trino',
    organization: 'acme-corp',
    environment: 'production',
    status: 'running',
    health: 'healthy',
    version: '435',
    replicas: { current: 3, desired: 3 },
    resources: { cpu: 65, memory: 72 },
    uptime: '15d 6h 32m',
    cost: '$124.50/day',
    lastUpdated: '2024-01-15T10:30:00Z',
    endpoints: ['https://trino.acme-corp.com', 'https://trino-admin.acme-corp.com']
  },
  {
    id: '2',
    name: 'spark-development',
    component: 'Spark on EKS',
    organization: 'tech-startup',
    environment: 'development',
    status: 'scaling',
    health: 'warning',
    version: '3.5.0',
    replicas: { current: 2, desired: 4 },
    resources: { cpu: 90, memory: 85 },
    uptime: '3d 12h 45m',
    cost: '$87.20/day',
    lastUpdated: '2024-01-16T14:20:00Z',
    endpoints: ['https://spark-dev.tech-startup.com']
  },
  {
    id: '3',
    name: 'hive-metastore',
    component: 'Hive Metastore',
    organization: 'enterprise-co',
    environment: 'production',
    status: 'running',
    health: 'healthy',
    version: '3.1.3',
    replicas: { current: 1, desired: 1 },
    resources: { cpu: 45, memory: 60 },
    uptime: '28d 14h 12m',
    cost: '$45.80/day',
    lastUpdated: '2024-01-10T09:15:00Z',
    endpoints: ['https://hive.enterprise-co.com']
  },
  {
    id: '4',
    name: 'jupyter-hub',
    component: 'Jupyter Hub',
    organization: 'acme-corp',
    environment: 'development',
    status: 'stopped',
    health: 'stopped',
    version: '4.0.2',
    replicas: { current: 0, desired: 0 },
    resources: { cpu: 0, memory: 0 },
    uptime: '0d 0h 0m',
    cost: '$0.00/day',
    lastUpdated: '2024-01-14T16:45:00Z',
    endpoints: ['https://jupyter-dev.acme-corp.com']
  }
];

function Deployments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDeployment, setSelectedDeployment] = useState(deployments[0]);

  const filteredDeployments = deployments.filter(deployment => {
    const matchesSearch = deployment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deployment.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deployment.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deployment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string, health: string) => {
    if (status === 'running' && health === 'healthy') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'running' && health === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (status === 'scaling') return <TrendingUp className="h-4 w-4 text-blue-500" />;
    if (status === 'stopped') return <Clock className="h-4 w-4 text-gray-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (status: string, health: string) => {
    if (status === 'running' && health === 'healthy') return <Badge className="bg-green-100 text-green-800">Running</Badge>;
    if (status === 'running' && health === 'warning') return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
    if (status === 'scaling') return <Badge className="bg-blue-100 text-blue-800">Scaling</Badge>;
    if (status === 'stopped') return <Badge variant="secondary">Stopped</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deployments</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your active component deployments.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            New Deployment
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search deployments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="scaling">Scaling</SelectItem>
            <SelectItem value="stopped">Stopped</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deployments List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Deployments</CardTitle>
              <CardDescription>
                {filteredDeployments.length} deployment{filteredDeployments.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredDeployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    className={`p-6 cursor-pointer border-l-4 transition-colors ${
                      selectedDeployment.id === deployment.id
                        ? 'bg-blue-50 border-l-blue-500'
                        : 'border-l-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDeployment(deployment)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(deployment.status, deployment.health)}
                        <div>
                          <h3 className="font-medium text-gray-900">{deployment.name}</h3>
                          <p className="text-sm text-gray-500">{deployment.component} • {deployment.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(deployment.status, deployment.health)}
                        <Badge variant="outline" className="text-xs">
                          {deployment.environment}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Replicas</p>
                        <p className="font-medium">{deployment.replicas.current}/{deployment.replicas.desired}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Uptime</p>
                        <p className="font-medium">{deployment.uptime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cost</p>
                        <p className="font-medium">{deployment.cost}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>CPU</span>
                        <span>{deployment.resources.cpu}%</span>
                      </div>
                      <Progress value={deployment.resources.cpu} className="h-1.5" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Memory</span>
                        <span>{deployment.resources.memory}%</span>
                      </div>
                      <Progress value={deployment.resources.memory} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deployment Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedDeployment.status, selectedDeployment.health)}
                  <div>
                    <CardTitle className="text-lg">{selectedDeployment.name}</CardTitle>
                    <CardDescription>{selectedDeployment.component}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedDeployment.status, selectedDeployment.health)}
                <span className="text-sm text-gray-500">v{selectedDeployment.version}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Organization</p>
                  <p className="font-medium">{selectedDeployment.organization}</p>
                </div>
                <div>
                  <p className="text-gray-500">Environment</p>
                  <p className="font-medium">{selectedDeployment.environment}</p>
                </div>
                <div>
                  <p className="text-gray-500">Uptime</p>
                  <p className="font-medium">{selectedDeployment.uptime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cost</p>
                  <p className="font-medium">{selectedDeployment.cost}</p>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resource Usage</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>CPU Usage</span>
                          <span>{selectedDeployment.resources.cpu}%</span>
                        </div>
                        <Progress value={selectedDeployment.resources.cpu} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Memory Usage</span>
                          <span>{selectedDeployment.resources.memory}%</span>
                        </div>
                        <Progress value={selectedDeployment.resources.memory} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Endpoints</h4>
                    <div className="space-y-2">
                      {selectedDeployment.endpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-mono">{endpoint}</span>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="mt-4">
                  <div className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="h-8 w-8 mx-auto mb-2" />
                      <p>Metrics visualization coming soon</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="logs" className="mt-4">
                  <div className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <Eye className="h-8 w-8 mx-auto mb-2" />
                      <p>Log viewer coming soon</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4 border-t space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {selectedDeployment.status === 'running' ? (
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Deployments;