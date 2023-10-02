import './App.css';
import PropTypes from 'prop-types';

export default function ArenaResults(props) {
    return (
        <div id="results">
            <h1 id="results_header"></h1>
            <button
                onClick={() => {
                    props.restart();
                    setTimeout(() => {
                        props.restart();
                    }, 1);
                }}
                type="reset"
            >
                Play again
            </button>
        </div>
    );
}

ArenaResults.propTypes = {
    restart: PropTypes.func.isRequired,
};
// export default ArenaResults;
