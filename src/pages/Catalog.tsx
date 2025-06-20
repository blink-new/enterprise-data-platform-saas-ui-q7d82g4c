import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ExternalLink,
  Database,
  Zap,
  BarChart3,
  Settings,
  Plus,
  Info,
  Users,
  Clock
} from 'lucide-react';

const componentCategories = [
  { id: 'all', name: 'All Components', count: 12 },
  { id: 'query-engines', name: 'Query Engines', count: 3 },
  { id: 'metadata', name: 'Metadata', count: 2 },
  { id: 'compute', name: 'Compute', count: 4 },
  { id: 'storage', name: 'Storage', count: 2 },
  { id: 'monitoring', name: 'Monitoring', count: 1 }
];

const components = [
  {
    id: '1',
    name: 'Trino',
    description: 'Fast distributed SQL query engine for big data analytics',
    category: 'query-engines',
    version: '435',
    rating: 4.8,
    downloads: '2.1k',
    icon: Database,
    vendor: 'Trino Community',
    tags: ['SQL', 'Analytics', 'Distributed'],
    pricing: '$0.08/hour',
    status: 'stable',
    subComponents: ['Coordinator', 'Workers', 'Gateway'],
    dependencies: ['Hive Metastore', 'S3 Connector'],
    resources: { cpu: '2-16 cores', memory: '4-64 GB', storage: '100GB+' }
  },
  {
    id: '2',
    name: 'Hive Metastore',
    description: 'Centralized metadata repository for data lake tables',
    category: 'metadata',
    version: '3.1.3',
    rating: 4.6,
    downloads: '1.8k',
    icon: Database,
    vendor: 'Apache Foundation',
    tags: ['Metadata', 'Schema', 'Catalog'],
    pricing: '$0.04/hour',
    status: 'stable',
    subComponents: ['Metastore Service', 'Database Backend'],
    dependencies: ['MySQL/PostgreSQL'],
    resources: { cpu: '1-4 cores', memory: '2-8 GB', storage: '50GB+' }
  },
  {
    id: '3',
    name: 'Spark on EKS',
    description: 'Unified analytics engine for large-scale data processing',
    category: 'compute',
    version: '3.5.0',
    rating: 4.9,
    downloads: '3.2k',
    icon: Zap,
    vendor: 'Apache Foundation',
    tags: ['Processing', 'ML', 'Streaming'],
    pricing: '$0.12/hour',
    status: 'stable',
    subComponents: ['Driver', 'Executors', 'Scheduler'],
    dependencies: ['Kubernetes', 'S3'],
    resources: { cpu: '4-32 cores', memory: '8-128 GB', storage: '200GB+' }
  },
  {
    id: '4',
    name: 'Jupyter Hub',
    description: 'Multi-user notebook environment for data science',
    category: 'compute',
    version: '4.0.2',
    rating: 4.7,
    downloads: '1.5k',
    icon: BarChart3,
    vendor: 'Project Jupyter',
    tags: ['Notebooks', 'Python', 'Data Science'],
    pricing: '$0.06/hour',
    status: 'stable',
    subComponents: ['Hub', 'Proxy', 'User Pods'],
    dependencies: ['Kubernetes', 'Persistent Storage'],
    resources: { cpu: '2-8 cores', memory: '4-32 GB', storage: '100GB+' }
  }
];

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComponent, setSelectedComponent] = useState(components[0]);

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Component Catalog</h1>
          <p className="text-gray-600 mt-1">Discover and deploy open-source data platform components.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Request Component
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {componentCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComponents.map((component) => (
              <Card 
                key={component.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedComponent.id === component.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedComponent(component)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <component.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <p className="text-sm text-gray-500">v{component.version}</p>
                      </div>
                    </div>
                    <Badge variant={component.status === 'stable' ? 'default' : 'secondary'}>
                      {component.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3">
                    {component.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {component.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {component.downloads}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">{component.pricing}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {component.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Component Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <selectedComponent.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedComponent.name}</CardTitle>
                  <p className="text-sm text-gray-500">by {selectedComponent.vendor}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-700">{selectedComponent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{selectedComponent.rating} rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span>{selectedComponent.downloads} deploys</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>v{selectedComponent.version}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>{selectedComponent.status}</span>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="config">Config</TabsTrigger>
                  <TabsTrigger value="docs">Docs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Sub-components</h4>
                    <div className="space-y-1">
                      {selectedComponent.subComponents.map((sub, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dependencies</h4>
                    <div className="space-y-1">
                      {selectedComponent.dependencies.map((dep, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {dep}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resource Requirements</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>CPU: {selectedComponent.resources.cpu}</div>
                      <div>Memory: {selectedComponent.resources.memory}</div>
                      <div>Storage: {selectedComponent.resources.storage}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="config" className="mt-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="replicas">Replicas</Label>
                      <Input id="replicas" placeholder="3" />
                    </div>
                    <div>
                      <Label htmlFor="cpu">CPU Limit</Label>
                      <Input id="cpu" placeholder="2000m" />
                    </div>
                    <div>
                      <Label htmlFor="memory">Memory Limit</Label>
                      <Input id="memory" placeholder="4Gi" />
                    </div>
                    <div>
                      <Label htmlFor="config">Custom Configuration</Label>
                      <Textarea id="config" placeholder="Add YAML configuration..." />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="mt-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Info className="h-4 w-4 mr-2" />
                      Deployment Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Community Support
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Deploy Component</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Deploy {selectedComponent.name}</DialogTitle>
                      <DialogDescription>
                        Configure and deploy this component to your selected environment.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="org">Organization</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="acme-corp">Acme Corp</SelectItem>
                            <SelectItem value="tech-startup">Tech Startup</SelectItem>
                            <SelectItem value="enterprise-co">Enterprise Co</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="env">Environment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select environment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="staging">Staging</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deployment-name">Deployment Name</Label>
                        <Input id="deployment-name" placeholder="my-trino-cluster" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Cancel</Button>
                      <Button>Start Deployment</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Catalog;