package cart.dto;

public class ProductIdRequest {
    private final Long productId;

    public ProductIdRequest(final Long productId) {
        this.productId = productId;
    }

    public long getProductId() {
        return productId;
    }
}
