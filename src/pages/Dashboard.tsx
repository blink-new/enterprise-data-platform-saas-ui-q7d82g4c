import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  DollarSign, 
  Server, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const metrics = [
  {
    title: 'Total Cost',
    value: '$2,847.32',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'This month'
  },
  {
    title: 'Active Deployments',
    value: '47',
    change: '+3',
    changeType: 'positive' as const,
    icon: Server,
    description: 'Across all orgs'
  },
  {
    title: 'Resource Utilization',
    value: '68%',
    change: '-5.2%',
    changeType: 'negative' as const,
    icon: Activity,
    description: 'CPU average'
  },
  {
    title: 'Success Rate',
    value: '99.2%',
    change: '+0.3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: 'Deployment success'
  }
];

const recentActivity = [
  {
    id: '1',
    title: 'Trino Cluster deployed',
    description: 'Production environment in acme-corp',
    time: '5 minutes ago',
    status: 'success' as const,
    icon: CheckCircle
  },
  {
    id: '2',
    title: 'Spark Job scaling up',
    description: 'Auto-scaling triggered in dev-env',
    time: '12 minutes ago',
    status: 'warning' as const,
    icon: TrendingUp
  },
  {
    id: '3',
    title: 'Hive Metastore updated',
    description: 'Version 3.1.3 deployed successfully',
    time: '1 hour ago',
    status: 'success' as const,
    icon: CheckCircle
  },
  {
    id: '4',
    title: 'Cost alert triggered',
    description: 'Monthly budget 80% reached',
    time: '2 hours ago',
    status: 'alert' as const,
    icon: AlertTriangle
  }
];

const activeDeployments = [
  {
    name: 'Trino Production',
    org: 'acme-corp',
    status: 'running',
    cpu: 65,
    memory: 72,
    cost: '$124.50/day'
  },
  {
    name: 'Spark Development',
    org: 'tech-startup',
    status: 'scaling',
    cpu: 90,
    memory: 85,
    cost: '$87.20/day'
  },
  {
    name: 'Hive Metastore',
    org: 'enterprise-co',
    status: 'running',
    cpu: 45,
    memory: 60,
    cost: '$45.80/day'
  }
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your data platform.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button>
            View Reports
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-2">
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your deployments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <activity.icon className={`h-4 w-4 ${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Deployments */}
        <Card>
          <CardHeader>
            <CardTitle>Active Deployments</CardTitle>
            <CardDescription>Current status of your running components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeDeployments.map((deployment, index) => (
              <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{deployment.name}</h4>
                    <p className="text-xs text-gray-500">{deployment.org}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      deployment.status === 'running' ? 'default' :
                      deployment.status === 'scaling' ? 'secondary' : 'destructive'
                    }>
                      {deployment.status}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{deployment.cost}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>CPU</span>
                      <span>{deployment.cpu}%</span>
                    </div>
                    <Progress value={deployment.cpu} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Memory</span>
                      <span>{deployment.memory}%</span>
                    </div>
                    <Progress value={deployment.memory} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;