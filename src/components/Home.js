import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div>
            <div className="w-100 text-center mt-2">
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Sign in</Link>
            </div>
        </div>
    )
}
