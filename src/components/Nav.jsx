// import { useState } from 'react'
// import { NavLink } from 'react-router-dom';
import Nav2 from './Nav2';

const Nav = () => {


    // const [active, setActive] = useState('./');
    
    return (
        // <div className='items'>

        //     <div className="logo">
        //         <img src="data:image/png;base64,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" alt="" />
        //     </div>

        //     <div className="nav-links">
        //         <ul className='navbar'>

        //             <ul class="navbar">
        //                 <li><NavLink to="/">home</NavLink></li>
        //                 <li><NavLink to="/collection">collection</NavLink></li>
        //                 <li><NavLink to="/about">about</NavLink></li>
        //                 <li><NavLink to="/contact">contact</NavLink></li>
        //             </ul>
        //             <li>
        //                 <a href="https://ecom-admin" target="_blank" className="admin-link">
        //                     <p>Admin Panel</p>
        //                 </a>
        //             </li>
        //         </ul>
        //     </div>
        //     <div className="nav-items">
        //         <div className="search">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANlSURBVHgBzVi9ctpAEF6JxiWdx5WVNxAeF3SWu3R2myq8gSnTIbqUdpnOrjKpEspUyLVt0CPIFXShTIYB8i3eE8dxQsKAhm9GoPvb+7R7t7d7Dm2I8/PzYDqdXjmO489mMw9VntacoD5Bfey6buf5+TmiLeAU6eT7fhWTNfF6g6dKxZHgifAx7TiOE9oQzp5I2dDu9XrhJgMyyYGYB2JdWjYbwWQjmO4e2ojwH/f7/VdtjI+/U4y7Rr8A7Z4hNsG4y6JadDKI+UKsqpGK8BeCzCMVBMQ0QLBlkBwJwThvvJNHjDWFJ4SsO3onILIJmS1afGwhgo4hhE3Z14jxzrt8z2K2EPSgwa6mRSZYWyfbXSosa2xnxBgsh+WxXKnizdblTUd55M7OzkKSxS+m3BkxkyBeR1LFlrrJ6l/hH1H5T1UJAV8g6DftAcPhcHR8fPwP832UKh/lb6j/a/ada04WqyKWbLP4iwDyb2X3M6pZ2lNmDWhBLqQSgHnaWrFp6+PIWdmVAQn82AcqCVjnf0g2oLiWSG93+RBXBayDiMrFvXqBaa/MRpejC1UA0V9UIjB3etrAar7Z7krYo/BKJWIymaQnhOUcnm+ItLLIebdLGH7UM9tdOmAcPLlEFWq12imVCIn/FBKz3dUOYuuO2ScqlYqnzZ2Y7exK0k0AXxNQiQAh3ceubEZ2wh2t3KByEagXEF3xsa4cGSqEqWIZBFQCcHQ1aBGiJbbwX+3WW1XBMT+Vg5Y2Z2TrMCcH03KINJKOAb6qSXuEyPdUmfNaW795sMmB3snJyREt1kAdAeAPDgxpx5DA9jtej4QYJ08dW9/UCbP2LPG9RzsmZuYpINbO6p+SQ6eRJb7fGUFbki7zUS45ITjPyA2C/W3XII+XlNNbmtx1G+vGFc746e0GKXx5eXmgguAoG9pp8dWEqpPrDF1u5h3K2rsSIwlOSeLhe5IOPiB5enpKPXu9XvfG4zFfjV3Qm0NfyklVLozXzxgb5hHMvQIDyZYhaGNIHsy+9I7XdobcFYKVPMFwJ49wKw9sCkxQNUxShNRXvH7iPFjPTUXu3K9KVQB35gwGg0j1KXR5qANh1QUEXksE4+lmF1fEazPms7LIjdQ6DW5Mbh/IIphr1jKQZeKDIMewETwYcgydIJ+5/wFYW/TpXDoMoAAAAABJRU5ErkJggg==" alt="" />
        //         </div>
        //         <div className="group">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAnCAYAAACBvSFyAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN4SURBVHgBzVg7ctpAGF4BRbrQ2TMuopzAiu2CVMFdOucGOCcInMBwAsMJwCeIXaU0dGQGiLiBUpF0KhmGR75PrMhK6LHi4fE/s7MP7e7/7b//a2WIHejq6qq8Wq0qKGV0TTlss+RyuYfBYNAVGcjIMtmyLDOfz7cl8yTqLJfLhm3bjjgkCACwcMpnNIuaSxwAudYBkhMaRAkAwHcfACThgkEd5cNoNDJYpHQ6yjKuecbaVNB5oUFnZ2dtVCUJwEH5iBM+/QH5c9D8PZlMnk5OTsaGYXzG0BuCRnuK8V7S/qnXIa/hl9/H6d+niRhLqlhzL7uuXOPGzU+9DmxWUbodnTvGnCakZcsur+NTIg+RQhCn5bdxokehSVjX3TDJ5SyxD4jQxm6G6WOlbYpDgYCIdc2T9FZpu3uBoDVsJqeINbSu7LdxjbbYB0RID6o6dk+/gqv7ogz19gIhN/DFWVRMLw5AUXpWjyCRbppFpTorOKEpHNBf5WTW6ekpy098C9w1AxuqH0JRRIC4Ds8LU5bYcYcT1gOL12boSGbUl4DO4CqrkEIrbe+sUXQLSBQxtqAQwIPQoEwgJBAq3X1I8TbMMc4w3tIN4zuBUMAwOJ2DseltZBgMbOOkGPGqaWdJlEolk/VisSjSkxYKBWc6nbq7SEILBBnOZrMbBrNQXhlFBOGg2LQegOyl6UcsCOl0KlRAjZwykaQpt4bD4aM2iMvLSzKmZzRFDNESxPrUfuFcKmuSW4/MOwMgpMY3USoRDG3UPAnduBN394rVWJQiSjliWgN5aX0LhOLzLZU5ShPN1q6mJ5PkOzRvQ586API1AOLi4qKtToTYyLxxKLuPcXI1AGkaEsAtqrYCoA7mDXEEAi/qWlV2vSTYC+UQ+Y0yr3MsACScvMbwLrtUgW8eCFV5+HwTRybw2wQ2KrCf1GzMKkvg2ZVwekfpFjMluoei+XweUHYfxGZQJ4fclyBtm8pPv4NSK8hxR/z3D6y74sikKr8via4/QFt+CWmo5IFgJqSA8B7AiB8V8UKkuu1qRDrPdK3Lxy1qPvld5g380O/3nagN/TwDymficGyfY50p/2nUojxwOIBVpZ8/ynUAzC3C+VbyGzBRPun59wXNjvr8OwRREkxwor4lZlb8QYLqHaRTlgktJeTVcXmDAt5h8ivW8YFv0ae4YPgPspPhtg0cN1gAAAAASUVORK5CYII=" alt="" />
        //         </div>
        //         <div className="bag">
        //             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL2SURBVHgBxVhLktowEG0b9vHsYDXOCcJ3z5wgcAKSE4Q5wXADyCpLnBMMOUHImgKcE0RZkV3IAYC8dklO4wxYdhnzqlT6S8/drVbLDuVAo9HwKpVKD8Xh8XhsIPd1V+g4jkI+X61WnykHHMqIdrvdB4mJIHEOCuTGWYlVsgxutVpjZJ+QPIvhPKZfr9ed7Xa7IEu4tgM1mSdTh5R2h8NhjNxfr9cOJ9SbSCO0KTH1Sc+1gpXKsOA7ZDNTx6YBsscwDHcvjYeN+VDXBKkv5jxg/IIKIvSDtM3g6+ebzWZgM6/ZbAYgNdRVBSm+TpuTqjI2YkFGIT2SJTB2hMxI0YfkemlzUglh0bemjK9dQOyKLKFVOo03c91h2hwbo24IcgFlBGznm6j20sbbEJJHXFF2qCyDXzTqbrfb2O/3RjITQYpt4g9lg6fXYLAKIxuEpw+Xy2V4kRAfVwycQTU9KgFsk/jw99IuHUkGRrchOy9cJHbaR0XSqppWkPlqyLAXBvs5XQlY3xNO08Pez8gjHxVJSF+Yz4YMUjPL8c6DpEaMJ3c1iTdmIEvm2mQYeo/A1EEu8nfm2Pv0j9CCysN3UfZiQiDhm1aITskZfFMjHZEmlBOYO9VrjGU79o0vZ7armFAKjLsfUX58SKwVAUdeiaofE+KYRnTIQSyxjzofU35MdfwUJNpjCUFakYSiU8biFATuzsU5RYNjcxjzb0MO4cndf4Q48qMSkRSGy/5A9CsqH8oUoLZXbrVa9U1DIhYuC/Kk3VkH+ddCQgj3LvTmm5p+5JUK6YsQaXgsoXvRX8rpSuDEObrnOkuE3NNnQr6p3UJlwE9R9txL91gZSN5nNz9lyfvMvXSPlYST++zEhkAu64uiUELENiR7yrpUL+wZEVKmZvP2Lhr6z0oEaChkQoFpQCgwQ8Cf+v4uCp1Op0finxNsKHQ4JkFhI4//LaD/rDy4rEMUBje66SWZAb9Eon+Mv4BarfaFjx06WHQ1KgGaCP+uiZ/TfwGEUnnMaG3eugAAAABJRU5ErkJggg==" alt="" />
        //             <p className='counter'>0</p>
        //         </div>
        //     </div>






        // </div>

        <div>
            <Nav2 />
        </div>
    )
}

export default Nav
