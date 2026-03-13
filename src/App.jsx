const services = [
  {
    name: 'Frontend Service',
    type: 'React / Nginx',
    status: 'Healthy',
    cpu: '22%',
    memory: '310 MB',
    version: 'v1.0.12'
  },
  {
    name: 'API Gateway',
    type: 'Internal Mock',
    status: 'Healthy',
    cpu: '18%',
    memory: '220 MB',
    version: 'v1.0.8'
  },
  {
    name: 'Auth Service',
    type: 'Internal Mock',
    status: 'Warning',
    cpu: '61%',
    memory: '540 MB',
    version: 'v1.0.5'
  },
  {
    name: 'Notifications',
    type: 'Worker Mock',
    status: 'Healthy',
    cpu: '29%',
    memory: '260 MB',
    version: 'v1.0.3'
  }
]

const deployments = [
  {
    id: '#412',
    service: 'Frontend Service',
    image: 'cloud-status-dashboard:412',
    environment: 'production',
    status: 'Success',
    time: '2026-03-13 10:42'
  },
  {
    id: '#411',
    service: 'Frontend Service',
    image: 'cloud-status-dashboard:411',
    environment: 'production',
    status: 'Success',
    time: '2026-03-13 09:58'
  },
  {
    id: '#410',
    service: 'Frontend Service',
    image: 'cloud-status-dashboard:410',
    environment: 'staging',
    status: 'Success',
    time: '2026-03-13 09:21'
  },
  {
    id: '#409',
    service: 'Auth Service',
    image: 'auth-service:409',
    environment: 'staging',
    status: 'Failed',
    time: '2026-03-13 08:47'
  }
]

const pipelineStages = [
  { name: 'Checkout', status: 'Done' },
  { name: 'Install', status: 'Done' },
  { name: 'Test', status: 'Done' },
  { name: 'Build', status: 'Done' },
  { name: 'Dockerize', status: 'Done' },
  { name: 'Push to ECR', status: 'Done' },
  { name: 'Deploy to ECS', status: 'Running' }
]

function StatusBadge({ status }) {
  const normalized = status.toLowerCase()

  return (
    <span className={`badge badge-${normalized}`}>
      {status}
    </span>
  )
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="card stat-card">
      <p className="card-label">{title}</p>
      <h3>{value}</h3>
      <p className="muted">{subtitle}</p>
    </div>
  )
}

function ServiceCard({ service }) {
  return (
    <div className="card service-card">
      <div className="card-top">
        <div>
          <h3>{service.name}</h3>
          <p className="muted">{service.type}</p>
        </div>
        <StatusBadge status={service.status} />
      </div>

      <div className="service-metrics">
        <div>
          <span className="metric-label">CPU</span>
          <strong>{service.cpu}</strong>
        </div>
        <div>
          <span className="metric-label">Memory</span>
          <strong>{service.memory}</strong>
        </div>
        <div>
          <span className="metric-label">Version</span>
          <strong>{service.version}</strong>
        </div>
      </div>
    </div>
  )
}

function DeploymentRow({ item }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.service}</td>
      <td>{item.image}</td>
      <td>{item.environment}</td>
      <td>
        <StatusBadge status={item.status} />
      </td>
      <td>{item.time}</td>
    </tr>
  )
}

function PipelineStep({ step }) {
  return (
    <div className="pipeline-step">
      <div className={`step-dot step-${step.status.toLowerCase()}`}></div>
      <div>
        <strong>{step.name}</strong>
        <p className="muted">{step.status}</p>
      </div>
    </div>
  )
}

export default function App() {
  const healthyCount = services.filter((s) => s.status === 'Healthy').length
  const warningCount = services.filter((s) => s.status === 'Warning').length
  const lastDeployment = deployments[0]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">☁</div>
          <div>
            <h2>CloudOps</h2>
            <p className="muted">Status Dashboard</p>
          </div>
        </div>

        <nav className="nav">
          <a href="#overview">Overview</a>
          <a href="#services">Services</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#deployments">Deployments</a>
        </nav>

        <div className="sidebar-box">
          <p className="card-label">Environment</p>
          <h3>Production</h3>
          <p className="muted">AWS ECS Fargate</p>
        </div>

        <div className="sidebar-box">
          <p className="card-label">Registry</p>
          <h3>AWS ECR</h3>
          <p className="muted">Image repo connected</p>
        </div>
      </aside>

      <main className="content">
        <header className="page-header" id="overview">
          <div>
            <p className="eyebrow">Junior DevOps / Cloud Portfolio Project</p>
            <h1>Cloud Service Status Dashboard</h1>
            <p className="muted">
              Monitor service health, recent deployments and CI/CD pipeline progress.
            </p>
          </div>

          <div className="header-actions">
            <button className="btn btn-secondary">View Logs</button>
            <button className="btn btn-primary">New Deployment</button>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard
            title="Healthy Services"
            value={healthyCount}
            subtitle="Running normally"
          />
          <StatCard
            title="Warnings"
            value={warningCount}
            subtitle="Requires review"
          />
          <StatCard
            title="Latest Build"
            value={lastDeployment.id}
            subtitle={lastDeployment.time}
          />
          <StatCard
            title="Current Image"
            value={lastDeployment.image}
            subtitle="Pushed to ECR"
          />
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <h2>Service Health</h2>
            <p className="muted">Runtime summary of deployed workloads</p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </section>

        <section id="pipeline" className="section two-column">
          <div className="card">
            <div className="section-heading">
              <h2>Pipeline Status</h2>
              <p className="muted">Jenkins build #412</p>
            </div>

            <div className="pipeline-list">
              {pipelineStages.map((step) => (
                <PipelineStep key={step.name} step={step} />
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-heading">
              <h2>Release Notes</h2>
              <p className="muted">Last deployment summary</p>
            </div>

            <ul className="notes-list">
              <li>Updated frontend dashboard metrics</li>
              <li>Improved service card responsiveness</li>
              <li>Added deployment history table</li>
              <li>Published new Docker image to ECR</li>
              <li>Rolled out latest task revision to ECS</li>
            </ul>
          </div>
        </section>

        <section id="deployments" className="section">
          <div className="section-heading">
            <h2>Recent Deployments</h2>
            <p className="muted">Build and release history</p>
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Build</th>
                  <th>Service</th>
                  <th>Image</th>
                  <th>Environment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((item) => (
                  <DeploymentRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}