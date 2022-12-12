import React from 'react'
import intro from './assets/intro.png'
import Content from './Content'
export default function Header() {

    // const search = async(req, res)

  return (
    <>
    <header>

        <div className="container mt-5 text-center">
            <div className="row">


                <div className="col-lg-6 col-md-12 col-xs-12 mx-4">
                    <div className="contents">
                        <h2 className="head-title">Find the <br/> job that fits your life</h2>
                        <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus, id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
                        <div className="job-search-form">
                            <form method='POST'>
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-xs-12">
                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Job Title"/>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-5 col-md-5 col-xs-12">
                                        <div className="form-group">
                                            <div className="search-category-container">
                                                <label className="styled-select">
                                                    <select>
                                                        <option value="none">Locations</option>
                                                        <option value="none">New York</option>
                                                        <option value="none">California</option>
                                                        <option value="none">Washington</option>
                                                        <option value="none">Birmingham</option>
                                                        <option value="none">Chicago</option>
                                                        <option value="none">Phoenix</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <i className="lni-map-marker"></i>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-2 col-md-2 col-xs-12">
                                        <button type="submit" className="button"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-12 col-xs-12 mx-3">
                    <div className="intro-img">
                        <img src={intro} alt="Not Loaded"/>
                    </div>
                </div>
            </div>
        </div>
        
    </header>
 
    <Content />

    </>

  )
}
