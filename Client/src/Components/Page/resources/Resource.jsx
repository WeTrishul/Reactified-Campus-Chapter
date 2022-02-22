import React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Resource.css';
// import Resources from '../Resources';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function Resource() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ifnothingtoshow = (data) => {
    if (data.length > 0) {
      return (
        <div>
          <p>Nothing to show</p>
        </div>
      );
    }
  };

  const [cpfolders, setcpfolders] = useState([]);
  const [dsafolders, setdsafolders] = useState([]);
  const [corefolders, setcorefolders] = useState([]);
  const [gatefolders, setgatefolders] = useState([]);
  const [placfolders, setplacfolders] = useState([]);
  const [aptifolders, setaptifolders] = useState([]);
  const [devfolders, setdevfolders] = useState([]);

  // to fetch all the folders of all resources

  useEffect(() => {
    // fetch CP folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/CP',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setcpfolders(data.arr);
      });

    // fetch DSA folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/DSA',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setdsafolders(data.arr);
      });

    // fetch CORE folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/CORE',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setcorefolders(data.arr);
      });

    // fetch placements folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/PLACEMENTS',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setplacfolders(data.arr);
      });

    // fetch DEV folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/DEV',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setdevfolders(data.arr);
      });

    // fetch Apti folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/CP',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setaptifolders(data.arr);
      });

    // fetch CP folders

    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/resourses/GATE',
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.arr);
        setgatefolders(data.arr);
      });
  }, []);

  return (
    <div>
      <div className='resouce-Body-Box'>
        <div className='resource-Outer-Box'>
          <div className='resource-Inner-Box'>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                height: '70vh',
              }}
            >
              <Tabs
                orientation='vertical'
                variant='scrollable'
                value={value}
                onChange={handleChange}
                aria-label='Vertical tabs example'
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label='Competitive Programming' {...a11yProps(0)} />
                <Tab label='Data Structure & Algorithms' {...a11yProps(1)} />
                <Tab label='Aptitude' {...a11yProps(2)} />
                <Tab label='Core Subjects' {...a11yProps(3)} />
                <Tab label='Devlopment' {...a11yProps(4)} />
                <Tab label='Gate' {...a11yProps(5)} />
                <Tab label='Placements' {...a11yProps(6)} />
              </Tabs>
              <Box style={{ width: '100%', overflowY: 'auto' }}>
                <TabPanel value={value} index={0}>
                  {cpfolders &&
                    cpfolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {dsafolders &&
                    dsafolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {aptifolders &&
                    aptifolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={3}>
                  {corefolders &&
                    corefolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={4}>
                  {devfolders &&
                    devfolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={5}>
                  {gatefolders &&
                    gatefolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
                <TabPanel value={value} index={6}>
                  {placfolders &&
                    placfolders.map((data, index) => {
                      return (
                        <Card
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '5px',
                          }}
                          to={'/ViewFiles/' + data.name}
                          component={Link}
                        >
                          {data.name}
                        </Card>
                      );
                    })}
                </TabPanel>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resource;
