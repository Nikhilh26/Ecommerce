import React from 'react'

export default function CategoryForm({ setValue, value, handleOnSubmit }) {
    return (
        <>
            <form>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Create Category'
                        value={value} onChange={(e) => setValue(e.target.value)} />
                </div>

                <button type="submit" classNameName="btn btn-primary" onClick={handleOnSubmit}>
                    submit
                </button>

            </form>
        </>
    )
}
