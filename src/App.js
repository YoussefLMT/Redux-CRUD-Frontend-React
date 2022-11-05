import React from 'react';

function App() {
  return (
    <div className="container mt-5">
      <h2 className='text-center'>Redux CRUD</h2>
      <div className="row mt-5">
        <div className="col-md-9 mx-auto">
          <div class="card">
            <div class="card-header">
              Users Managment

              {/* Button trigger add user modal */}
              <button type="button" class="btn btn-primary" style={{ float: 'right' }} data-bs-toggle="modal" data-bs-target="#addUserModal">
                Add User
              </button>
            </div>
          </div>
          <div class="card-body">
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

      {/* Add User Modal  */}
      <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" />
                </div>
                <div class="mb-3">
                  <label for="passowrd" class="form-label">Password</label>
                  <input type="passowrd" class="form-control" id="passowrd" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
