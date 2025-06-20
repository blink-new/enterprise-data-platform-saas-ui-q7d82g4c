import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Target,
  Zap,
  Server
} from 'lucide-react';

const costMetrics = [
  { title: 'Total Spend', value: '$2,847.32', change: '+12.5%', trend: 'up' },
  { title: 'This Month', value: '$1,247.85', change: '+8.2%', trend: 'up' },
  { title: 'Avg Daily', value: '$94.89', change: '-3.1%', trend: 'down' },
  { title: 'Budget Remaining', value: '$1,152.68', change: '76.2%', trend: 'neutral' }
];

const performanceMetrics = [
  { title: 'Avg Query Time', value: '2.4s', change: '-15.3%', trend: 'down' },
  { title: 'Throughput', value: '1,247 QPS', change: '+22.1%', trend: 'up' },
  { title: 'Success Rate', value: '99.2%', change: '+0.3%', trend: 'up' },
  { title: 'Error Rate', value: '0.8%', change: '-0.3%', trend: 'down' }
];

const costBreakdown = [
  { component: 'Trino Production', cost: '$890.20', percentage: 31.2, trend: 'up' },
  { component: 'Spark Development', cost: '$567.40', percentage: 19.9, trend: 'up' },
  { component: 'Kafka Streaming', cost: '$445.80', percentage: 15.6, trend: 'stable' },
  { component: 'Hive Metastore', cost: '$324.50', percentage: 11.4, trend: 'down' },
  { component: 'Jupyter Hub', cost: '$198.30', percentage: 7.0, trend: 'up' },
  { component: 'Other Components', cost: '$421.12', percentage: 14.9, trend: 'stable' }
];

const alerts = [
  {
    id: '1',
    type: 'cost',
    severity: 'warning',
    title: 'Budget Alert',
    description: 'Monthly budget 80% reached for acme-corp',
    time: '2 hours ago',
    component: 'Trino Production'
  },
  {
    id: '2',
    type: 'performance',
    severity: 'critical',
    title: 'High Error Rate',
    description: 'Error rate above 5% for spark-development',
    time: '1 hour ago',
    component: 'Spark Development'
  },
  {
    id: '3',
    type: 'resource',
    severity: 'info',
    title: 'Auto-scaling Triggered',
    description: 'CPU usage above 80%, scaling up replicas',
    time: '30 minutes ago',
    component: 'Kafka Streaming'
  }
];

function Metrics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metrics & Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor costs, performance, and resource utilization across your platform.</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="costs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="costs">Cost Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {costMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </CardTitle>
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : null}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-red-600' : 
                      metric.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Component</CardTitle>
                <CardDescription>Monthly spending distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.component}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{item.cost}</span>
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : item.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500 w-12">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>Recommendations to reduce spending</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Right-size Trino Workers</h4>
                      <p className="text-sm text-blue-700">Reduce worker nodes by 20% during off-peak hours</p>
                      <p className="text-xs text-blue-600 mt-1">Potential savings: $180/month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-900">Enable Auto-scaling</h4>
                      <p className="text-sm text-green-700">Configure HPA for Spark executors</p>
                      <p className="text-xs text-green-600 mt-1">Potential savings: $240/month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-900">Schedule Downtime</h4>
                      <p className="text-sm text-yellow-700">Stop dev environments during weekends</p>
                      <p className="text-xs text-yellow-600 mt-1">Potential savings: $120/month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </CardTitle>
                  <Activity className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : null}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' || metric.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Query performance and throughput over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg">Performance charts coming soon</p>
                  <p className="text-sm">Real-time metrics visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>CPU, memory, and storage usage across deployments</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Server className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg">Resource monitoring coming soon</p>
                  <p className="text-sm">Cluster-wide resource analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Current alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-100' :
                    alert.severity === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <Badge variant={
                        alert.severity === 'critical' ? 'destructive' :
                        alert.severity === 'warning' ? 'secondary' :
                        'default'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{alert.component}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Metrics;