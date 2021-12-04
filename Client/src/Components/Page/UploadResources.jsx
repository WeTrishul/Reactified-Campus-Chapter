import React from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';

function UploadResources(props) {
  return (
    <div>
      <div className='viewBlogsHeading'>
        <h2>Lists of Resources</h2>
      </div>
      <div>
        <div className='ViewblogsOuterBox'>
          <div className='ViewblogsInnerBox'>
            <div className='ViewblogsListBox'>
              <Link to='Resources/CP' className='ViewallBlogsLink'>
                CP
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/DSA' className='ViewallBlogsLink'>
                DSA
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/APTI' className='ViewallBlogsLink'>
                Aptitude
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/CORE' className='ViewallBlogsLink'>
                Core Subjects (CS)
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/DEV' className='ViewallBlogsLink'>
                Development
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/GATE' className='ViewallBlogsLink'>
                Gate
              </Link>
            </div>
            <div className='ViewblogsListBox'>
              <Link to='Resources/PLACEMENTS' className='ViewallBlogsLink'>
                Placement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResources;
