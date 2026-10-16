import { useMemo, useState } from 'react'
import {
  Activity, ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays, Check,
  ChevronDown, CircleHelp, Clock3, Filter, FolderKanban, Grid2X2, LayoutDashboard,
  ListTodo, MoreHorizontal, Plus, Search, Settings, Sparkles, Target, Users,
  X, Zap
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My work', icon: ListTodo, count: 8 },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Team', icon: Users },
  { label: 'Calendar', icon: CalendarDays },
]

const initialProjects = [
  { name: 'Atlas mobile app', type: 'Product design', owner: 'Maya Chen', initials: 'MC', color: 'violet', progress: 78, status: 'On track', due: 'Oct 28', tasks: '24 / 31', members: ['MC', 'JD', 'AK'] },
  { name: 'Q4 growth campaign', type: 'Marketing', owner: 'James Davis', initials: 'JD', color: 'orange', progress: 52, status: 'At risk', due: 'Nov 04', tasks: '18 / 35', members: ['JD', 'SR', 'MC'] },
  { name: 'Design system 2.0', type: 'Engineering', owner: 'Ari Kim', initials: 'AK', color: 'blue', progress: 91, status: 'On track', due: 'Oct 21', tasks: '42 / 46', members: ['AK', 'MC', 'PL'] },
  { name: 'Customer research', type: 'Research', owner: 'Sam Rivera', initials: 'SR', color: 'pink', progress: 34, status: 'On track', due: 'Nov 12', tasks: '9 / 26', members: ['SR', 'JD'] },
]

const activity = [
  { person: 'Maya Chen', initials: 'MC', action: 'completed', subject: 'Onboarding flow v2', time: '12 min ago', color: 'violet' },
  { person: 'James Davis', initials: 'JD', action: 'commented on', subject: 'Q4 campaign brief', time: '48 min ago', color: 'orange' },
  { person: 'Ari Kim', initials: 'AK', action: 'moved', subject: 'Token migration', time: '2 hrs ago', color: 'blue' },
  { person: 'Sam Rivera', initials: 'SR', action: 'created', subject: 'User interview plan', time: '4 hrs ago', color: 'pink' },
]

const weekly = [62, 74, 58, 85, 70, 92, 78, 88, 68, 76, 95, 82]

function Avatar({ initials, color = 'violet', small = false }) {
  return <span className={`avatar ${color} ${small ? 'small' : ''}`}>{initials}</span>
}

function ProgressBar({ value }) {
  return <div className="progress-track"><span style={{ width: `${value}%` }} /></div>
}

function App() {
  const [active, setActive] = useState('Overview')
  const [projectList, setProjectList] = useState(initialProjects)
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('All projects')
  const [newProject, setNewProject] = useState({ name: '', description: '', team: 'Product team', due: '' })

  const visibleProjects = useMemo(() => projectList.filter((project) => {
    const matchesQuery = `${project.name} ${project.type} ${project.owner}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All projects' || project.status === filter
    return matchesQuery && matchesFilter
  }), [projectList, query, filter])

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const createProject = (event) => {
    event.preventDefault()
    const name = newProject.name.trim()
    if (!name) return

    setProjectList((currentProjects) => [{
      name,
      type: newProject.team,
      owner: 'Alex Lee',
      initials: 'AL',
      color: 'teal',
      progress: 0,
      status: 'On track',
      due: newProject.due ? new Date(`${newProject.due}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Not set',
      tasks: '0 / 0',
      members: ['AL'],
    }, ...currentProjects])
    setNewProject({ name: '', description: '', team: 'Product team', due: '' })
    setShowModal(false)
    setFilter('All projects')
    notify(`${name} was added to your projects`)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><span>Nexus</span></div>
        <div className="workspace-switcher"><div className="workspace-logo">N</div><div><strong>Nimbus studio</strong><small>Workspace</small></div><ChevronDown size={15} /></div>
        <nav className="main-nav">
          <div className="nav-label">Workspace</div>
          {navItems.map(({ label, icon: Icon, count }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon size={17} /><span>{label}</span>{count && <em>{count}</em>}</button>)}
          <div className="nav-label nav-label-spaced">Your teams</div>
          <button className="nav-item"><span className="team-dot purple" />Product team</button>
          <button className="nav-item"><span className="team-dot yellow" />Growth team</button>
          <button className="nav-item"><span className="team-dot teal" />Research lab</button>
          <button className="add-team"><Plus size={16} /> Add team</button>
        </nav>
        <div className="sidebar-bottom"><button className="nav-item"><Settings size={17} />Settings</button><button className="nav-item"><CircleHelp size={17} />Help center</button><div className="profile"><Avatar initials="AL" color="teal" /><div><strong>Alex Lee</strong><small>Admin</small></div><MoreHorizontal size={16} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search anything" /><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="Notifications" onClick={() => notify('You are all caught up')}><Bell size={18} /><i /></button><div className="top-avatar">AL</div></div></header>

        <div className="page-content">
          <section className="welcome-row"><div><p className="eyebrow">Tuesday, October 14, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="subtitle">Here’s the pulse of your workspace today.</p></div><button className="primary-button" onClick={() => setShowModal(true)}><Plus size={17} /> New project</button></section>

          <section className="metric-grid">
            <article className="metric-card accent-purple"><div className="metric-head"><span className="metric-icon"><Target size={18} /></span><span className="trend positive">+12.5% <ArrowUpRight size={13} /></span></div><strong>84%</strong><span className="metric-label">Team completion rate</span><div className="metric-sparkline purple-lines">{weekly.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>
            <article className="metric-card accent-orange"><div className="metric-head"><span className="metric-icon"><BriefcaseBusiness size={18} /></span><span className="trend positive">+2 <ArrowUpRight size={13} /></span></div><strong>12</strong><span className="metric-label">Active projects</span><div className="mini-avatars"><Avatar initials="MC" color="violet" small /><Avatar initials="JD" color="orange" small /><Avatar initials="AK" color="blue" small /><Avatar initials="+8" color="gray" small /></div></article>
            <article className="metric-card accent-teal"><div className="metric-head"><span className="metric-icon"><Clock3 size={18} /></span><span className="trend neutral">This week</span></div><strong>38.5h</strong><span className="metric-label">Tracked across teams</span><div className="time-meter"><span style={{ width: '68%' }} /></div><small className="muted">68% of weekly capacity</small></article>
            <article className="metric-card accent-pink"><div className="metric-head"><span className="metric-icon"><Zap size={18} /></span><span className="trend positive">+18.2% <ArrowUpRight size={13} /></span></div><strong>24</strong><span className="metric-label">Tasks completed</span><div className="metric-bottom"><span className="check-circle"><Check size={12} /></span><small>8 more than last week</small></div></article>
          </section>

          <div className="dashboard-grid"><section className="panel projects-panel"><div className="panel-heading"><div><h2>Projects</h2><p>Keep an eye on your most important work.</p></div><button className="text-button" onClick={() => setActive('Projects')}>View all <ArrowUpRight size={14} /></button></div><div className="filter-row"><div className="segmented"><button className={filter === 'All projects' ? 'selected' : ''} onClick={() => setFilter('All projects')}>All projects</button><button className={filter === 'On track' ? 'selected' : ''} onClick={() => setFilter('On track')}>On track</button><button className={filter === 'At risk' ? 'selected' : ''} onClick={() => setFilter('At risk')}>At risk</button></div><button className="filter-button"><Filter size={14} /> Filters</button></div><div className="table-wrap"><table><thead><tr><th>Project</th><th>Owner</th><th>Progress</th><th>Status</th><th>Due date</th><th /></tr></thead><tbody>{visibleProjects.map((project) => <tr key={project.name}><td><div className="project-name"><span className={`project-symbol ${project.color}`}><Grid2X2 size={15} /></span><div><strong>{project.name}</strong><small>{project.type}</small></div></div></td><td><div className="owner"><Avatar initials={project.initials} color={project.color} small /><span>{project.owner}</span></div></td><td><div className="progress-cell"><div><ProgressBar value={project.progress} /><small>{project.tasks} tasks</small></div><strong>{project.progress}%</strong></div></td><td><span className={`status ${project.status === 'At risk' ? 'risk' : ''}`}><i />{project.status}</span></td><td className="due-date">{project.due}</td><td><button className="more-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table>{visibleProjects.length === 0 && <div className="empty-state">No projects match your search.</div>}</div></section>

            <aside className="right-column"><section className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your team.</p></div><button className="more-button"><MoreHorizontal size={17} /></button></div><div className="activity-list">{activity.map((item) => <div className="activity-item" key={item.person + item.subject}><Avatar initials={item.initials} color={item.color} small /><div><p><strong>{item.person}</strong> {item.action} <b>{item.subject}</b></p><small>{item.time}</small></div></div>)}</div><button className="activity-link" onClick={() => notify('Activity history is up to date')}>See all activity <ArrowUpRight size={14} /></button></section><section className="panel focus-card"><div className="focus-glow" /><div className="focus-icon"><Activity size={18} /></div><span className="eyebrow">Focus for today</span><h2>Make space for deep work.</h2><p>You have 3 hours 20 minutes of focused time scheduled today.</p><button onClick={() => notify('Focus mode enabled')}>Start focus mode <ArrowUpRight size={14} /></button></section></aside>
          </div>
        </div>
      </main>
      {showModal && <div className="modal-backdrop" onClick={() => setShowModal(false)}><form className="modal" onSubmit={createProject} onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">Workspace</p><h2>Create a new project</h2></div><button type="button" className="close-button" onClick={() => setShowModal(false)}><X size={18} /></button></div><label>Project name<input autoFocus required value={newProject.name} onChange={(event) => setNewProject({ ...newProject, name: event.target.value })} placeholder="e.g. Website redesign" /></label><label>Project description<textarea value={newProject.description} onChange={(event) => setNewProject({ ...newProject, description: event.target.value })} placeholder="What are you working towards?" rows="3" /></label><div className="modal-fields"><label>Team<select value={newProject.team} onChange={(event) => setNewProject({ ...newProject, team: event.target.value })}><option>Product team</option><option>Growth team</option><option>Research lab</option></select></label><label>Due date<input type="date" value={newProject.due} onChange={(event) => setNewProject({ ...newProject, due: event.target.value })} /></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="primary-button">Create project</button></div></form></div>}
      {toast && <div className="toast"><span className="toast-check"><Check size={13} /></span>{toast}</div>}
    </div>
  )
}

export default App
