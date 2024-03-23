function PaymentsPage(props){

    return (
        <>
            <p style={{ color: 'green' }}>Congratulations! An order has been successfully created for you. Please proceed with payment, or if it's a large order requiring confirmation from our sales team, you may skip the payment for now.</p>
            <button>Complete Payment</button>
            <br>
            </br>
            <button>Skip payment</button>
        </>
    )
}

export default PaymentsPage;