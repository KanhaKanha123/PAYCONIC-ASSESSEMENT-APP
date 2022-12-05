import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from '../../constants/constant';
import { CurrencyExchangeAppState } from '../../store/context/Context';

const Header = () => {
    const navigate = useNavigate();

    //Global application state for exchange details results
    const { dispatchExchangeHistory } = CurrencyExchangeAppState();

    //navigate to dashboard page
    const navigateClickExchange = () => {
        //clear history state when manually click on navigation
        dispatchExchangeHistory({ type: "CURRENCY_EXCHANGE_INPUT", payload: {} });
        navigate(RoutesConfig.dashboard);
    };

    //navigate to history page
    const navigateClickHistory = () => {
        navigate(RoutesConfig.history);
    };

    return (<Navbar aria-label='exchange app header' data-testid="header" bg='dark' variant='dark' className='app-header'>
        <Container>
            <Navbar.Brand className='flex-header--item-left'>
                <div className="tab">
                    <button onClick={navigateClickExchange} className="tablinks">Exchange</button>
                    <button onClick={navigateClickHistory} className="tablinks">History</button>
                </div>
            </Navbar.Brand>
            <Navbar.Brand className='flex-header--item-right'>
            </Navbar.Brand>
        </Container>
        <Nav></Nav>
    </Navbar>);
}

export default Header;