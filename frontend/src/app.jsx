import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import Landing from './pages/Landing';
import Reserva from './pages/Reserva';
import './tailwind.css';

export function App() {
	return (
		<LocationProvider>
			<div class="w-full min-h-screen">
				<Router>
					<Route path="/" component={Landing} />
					<Route path="/reserva" component={Reserva} />
				</Router>
			</div>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
