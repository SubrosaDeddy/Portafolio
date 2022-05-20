var docurl = new URL(document.URL);
var id;
var index;
const compraBtn = $("#compraBtn");
var cost;

document.addEventListener('DOMContentLoaded', function() 
{    
});

$(document).ready(function()
{
    const costLbl = $("#costLbl");
    const quantityLbl = $("#quantityLbl");

    id = docurl.searchParams.get("id");   
    index = docurl.searchParams.get("index");   
    paypal.Buttons().render('.user');
    getPurchaseInfo();

    $(compraBtn).click(function(e)
    {
        e.preventDefault();
        $.ajax({
            type:'post',
                // url: 'http://localhost/BDM%20Web%20Page/php/BuyCourse.php?id='+id+'&index='+index+'&paymentMethod='+1+'&amountToPay='+cost,
                url: 'php/BuyCourse.php?id='+id+'&index='+index+'&paymentMethod='+1+'&amountToPay='+cost,
                success: function(msg, status, jqXHR)
                {
                    console.log(msg);
                    alert("Comprao', felicidades, tienes "+index+" niveles listos para ver :D");
                    window.history.back();
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
        });
    })

});

function getPurchaseInfo()
{
    $.ajax({
        type:'get',
            // url: 'http://localhost/BDM%20Web%20Page/php/GetPurchaseInfo.php?id='+id+'&index='+index,
            url: 'php/GetPurchaseInfo.php?id='+id+'&index='+index,
            success: function(msg, status, jqXHR)
            {
                const json = JSON.parse(msg);
                cost = parseInt(json.cost);
                costLbl.innerHTML = json.cost;
                quantityLbl.innerHTML = json.levelsToPay;
            },
            error: function(xhr, status, error) 
            {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
    });
}


paypal.Buttons({

        // Sets up the transaction when a payment button is clicked
        createOrder: function(data, actions) {
             const costLbl = $("#costLbl");
        
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: costLbl // Can reference variables or functions. Example: `value: document.getElementById('...').value`
              }

            }]
          });
        },

        // Finalize the transaction after payer approval
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            // Successful capture! For dev/demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                var transaction = orderData.purchase_units[0].payments.captures[0];
                alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

            // When ready to go live, remove the alert and show a success message within this page. For example:
            // var element = document.getElementById('paypal-button-container');
            // element.innerHTML = '';
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
          });

           $.ajax({
            type:'post',
                // url: 'http://localhost/BDM%20Web%20Page/php/BuyCourse.php?id='+id+'&index='+index+'&paymentMethod='+1+'&amountToPay='+cost,
                url: 'php/BuyCourse.php?id='+id+'&index='+index+'&paymentMethod='+1+'&amountToPay='+cost,
                success: function(msg, status, jqXHR)
                {
                    console.log(msg);
                    alert("Comprao', felicidades, tienes "+index+" niveles listos para ver :D");
                    window.history.back();
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
        }
      }).render('.paypal-container');


