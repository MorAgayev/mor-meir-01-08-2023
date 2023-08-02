import PropTypes from 'prop-types'; 
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Loader } from './Loader';

export function MainModal({children = <Loader/>, close}) {
    return (
        <section className="main__modal">
            <div className="main__modal-content">
                <span className='main__modal-close' onClick={close}>
                    <IconContext.Provider value={{ className: "main__modal-close-icon"}}>
                        <AiOutlineCloseCircle/>
                    </IconContext.Provider>
                </span>
                {children}
            </div>
        </section>
    )
}

MainModal.propTypes = {
    children: PropTypes.object,
    close: PropTypes.func
}