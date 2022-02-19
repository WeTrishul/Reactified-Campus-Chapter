import React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
                marginTop: '1rem',
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
                  <Card
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    CP
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                  Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                  Item Seven
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
