import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    
     // Arrange
      //TODO: Create paymentDetails object initialized with fake data
     const paymentDetails: PaymentDetails = {
      amount: 2000,
      currency: 'DT',
      method: PaymentMethod.CreditCard,
      cardNumber: '1234-5678-9876-5432',
    };
      //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = {
      status: 'success',
      transactionId: 'trans12345',
    };
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);

    // Act
    const result = paymentService.makePayment(paymentDetails);

    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toBe('Payment successful. Transaction ID: trans12345');
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails);

  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails: PaymentDetails = {
      amount: 2000,
      currency: 'DT',
      method: PaymentMethod.PayPal,
    };
    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse = {
      status: 'failure',
    };
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);

    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const paymentDetails: PaymentDetails = {
      amount: -50, // Invalid amount
      currency: 'DT',
      method: PaymentMethod.BankTransfer,
    };
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});








