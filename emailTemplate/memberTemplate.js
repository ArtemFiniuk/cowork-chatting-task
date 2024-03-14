const constructMailOptions = (emailBody) => {
    return {
    from: '"Coworking Space Management" <fazilotislam5@gmail.com>',
    to: `${emailBody.email}`,
    subject: 'Buzz Coworking',
    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Coworking Space Management</title>
</head>
<body style="margin-top:20px;margin-bottom:20px;background-color: #fbfbfb;">
  <!-- Main table -->
  <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="#1F2937" width="650">
    <tr>
      <td>
        <!-- Child table -->
        <table border="0" cellspacing="0" cellpadding="0" style="color:#fbfbfb; font-family: sans-serif; width: 100%;">
          <tr>
            <td>
              <h2 style="text-align:center; margin: 0px; padding-bottom: 25px; margin-top: 25px;">
                <i>Coworking </i><span style="color:lightcoral"> Space Management</span></h2>
            </td>
          </tr>
          <tr>
            <td>
              <img src="https://i.ibb.co/yYgs7rC/logo.png" height="50px" style="display:block; margin:auto;padding-bottom: 25px; ">
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <h1 style="margin: 0px;padding-bottom: 10px;font-size:18px;">Name: ${emailBody.firstName} ${emailBody.lastName}</h1>
              <h2 style="margin: 0px;padding-bottom: 10px;font-size:15px;">Phone: ${emailBody.phoneNumber}</h2>
              <h2 style="margin: 0px;padding-bottom: 10px;font-size:15px;">Business Name: ${emailBody.businessName}</h2>
              <h2 style="margin: 0px;padding-bottom: 10px;font-size:15px;">Business Phone: ${emailBody.businessPhone}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" style="background-color:#6366f1; color:white; padding:15px 97px; outline: none; display: block; margin: auto; border-radius: 31px;
                                font-weight: bold; margin-top: 25px; margin-bottom: 25px; border: none; text-transform:uppercase; ">Login</button>
            </td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <h2 style="padding-top: 25px; line-height: 1; margin:0px;">Need Help?</h2>
              <div style="margin-bottom: 25px; font-size: 15px;margin-top:7px;">Give us a call Sample-1800
              </div>
            </td>
          </tr>
        </table>
        <!-- /Child table -->
      </td>
    </tr>
  </table>
  <!-- / Main table -->
</body>

</html>`
};
};

module.exports = constructMailOptions;