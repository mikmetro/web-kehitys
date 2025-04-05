<h1>Protected API routes information</h1>

<h2>User routes</h2>
<code>GET /api/v1/user</code>
<p>Get your own user information. Admins can get all users.</p>
<br>
<code>PUT /api/v1/user/:id</code>
<p>Update your own user information. Admins can update any user.</p>
<br>
<code>DELETE /api/v1/user/:id</code>
<p>Delete your own user information and cats linked to you. Admins can delete any user.</p>
<br>

<h2>Cat routes</h2>
<code>GET /api/v1/cat</code>
<p>Get all your cats information. Admins get every users cats.</p>
<code>POST /api/v1/cat</code>
<p>Add a cat linked to you. Admins can add cats to any user.</p>
<code>PUT /api/v1/cat/:id</code>
<p>Update any cat owned by you. Admins can edit any cat from any user.</p>
<code>DELETE /api/v1/cat/:id</code>
<p>Delete a cat owned by you. Admins can delete any cat from any user</p>
