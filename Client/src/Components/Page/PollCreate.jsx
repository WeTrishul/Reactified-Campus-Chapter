import React from 'react'
import "./PollCreate.css"

function PollCreate() {
    return (
        <div>
            <div className="main-wrap">
                <div className="outer-wrap">
                    <h1>Create Poll</h1>
                    <hr />
                    
                    <form  className="register-form">

                        <label htmlFor="Poll Name">Poll Name</label><br />
                        <input type="text" name='email' className='email' placeholder='ex:Survey Poll'/><br />

                        <label htmlFor="Question" >Question</label><br />
                        <input type="text" name='pass'  className='pass' placeholder='ex: Which platform is good for biginners ?' /><br />

                        <label htmlFor="Option A" >Option A</label><br />
                        <input type="text" name='cdfrce'  className='Codeforces' placeholder='ex:Codeforces' /><br />

                        <label htmlFor="Option B">Option B</label><br />
                        <input type="text" name='cdchef'  className='Cdchef' placeholder='Codechef'/><br />

                        <label htmlFor="Option C" >Option C</label><br />
                        <input type="text" name='hckrnk'  className='hckrnk' placeholder='ex: Geeksforgeeks' /><br />

                        <label htmlFor="Option D" >Option D</label><br />
                        <input type="text" name='hckrnk'  className='hckrnk' placeholder='ex: Hackerrank' /><br />


                        <button type='submit' className="register-btn">Create Poll</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default PollCreate
