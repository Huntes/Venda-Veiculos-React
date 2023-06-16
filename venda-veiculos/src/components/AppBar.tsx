import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Image } from 'react-bootstrap';
import { Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const token = localStorage.getItem('token');
const pages = ['Home'];
const settings = ['Login', 'Logout'];

token && pages.push('Cadastrar Veículo');

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    console.log('Entoru aq')
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    console.log('entrou aq 2')
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log('fechou aq')
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const clickIconUserOptions = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
    event.preventDefault();

    let button = event.target as HTMLElement;

    switch(button.innerText.toUpperCase()){
      case 'LOGIN':
        window.location.href = '/Login';
        break;
      case 'LOGOUT':
        localStorage.removeItem('token');
        window.location.href = '/';
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  }

  const clickMenuOptions = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event);
    event.preventDefault();
    console.log(event.target)
    let button = event.target as HTMLElement;

    switch(button.innerText.toUpperCase()){
      case 'CADASTRAR VEÍCULO':
        window.location.href = '/CadastroVeiculo';
        break;
      case 'HOME':
        window.location.href = '/';
        break;
      default:
        break;
    }
    setAnchorElNav(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <CarRentalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
         <Stack direction={'row'} justifyContent={'flex-start'} alignContent={'center'} alignItems={'center'}> 
          <Image src="../src/assets/ico/VendaVeiculosV1.ico" width={70} height={70} rounded={true} />
         </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="conta de usuário logado"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center" onClick={clickMenuOptions}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Venda Veículos
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={clickMenuOptions}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          { token != null 
          ? 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={settings[1]}>
                  <Typography textAlign="center" onClick={clickIconUserOptions}>{settings[1]}</Typography>
                </MenuItem>
            </Menu>
          </Box> 
          : 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <LoginIcon sx={{ fontSize: 35, color: 'white' }}  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={settings[0]}>
                  <Typography textAlign="center" onClick={clickIconUserOptions}>{settings[0]}</Typography>
                </MenuItem>
            </Menu>
          </Box> 
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;