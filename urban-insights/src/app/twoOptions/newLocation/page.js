export default function NewLocation(){
    return(
        <div>
            <form>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input id='name' name='name' ></input>
                </div>
                <div>
                    <label htmlFor='state'>States:</label>
                    <input id='state' name='state' ></input>
                </div>
                <div>
                    <label htmlFor='name'>Neighbor:</label>
                    <input id='neighbor' name='neighbor' ></input>
                </div>
                <div>
                    <label htmlFor='name'>Area:</label>
                    <input id='area' name='area' ></input>
                </div>
                <div>
                    <label htmlFor='borderLength'>Area:</label>
                    <input id='borderLength' name='borderLenght' ></input>
                </div>
            </form>
        </div>
    )
}