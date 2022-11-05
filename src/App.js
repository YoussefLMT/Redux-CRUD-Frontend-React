import React from 'react';

function App() {
  return (
    <div className="container mt-5">
      <h2 className='text-center'>Redux CRUD</h2>
      <div className="row">
        <div className="col-md 9 mx-auto">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
