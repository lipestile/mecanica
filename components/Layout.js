import Navigation from "./navegação";


function Layout( props ) {
    return (
        <div className="font-poppins">
            <Navigation />
            <div className='bg-dark text-white py-3 text-center mb-3'>
                <h1>{props.titulo}</h1>
            </div>
            <main className="px-2 lg:px-16">{props.children}</main>
        </div>
    );
}
export default Layout;