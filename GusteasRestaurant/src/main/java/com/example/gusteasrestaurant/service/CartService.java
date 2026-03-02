package com.example.gusteasrestaurant.service;

import com.example.gusteasrestaurant.model.CartItem;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private static final String CART_KEY = "cart";

    @SuppressWarnings("unchecked")
    public List<CartItem> getCart(HttpSession session) {
        List<CartItem> cart = (List<CartItem>) session.getAttribute(CART_KEY);
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute(CART_KEY, cart);
        }
        return cart;
    }

    public void addToCart(HttpSession session, String name, int price) {
        List<CartItem> cart = getCart(session);

        // Optional: increase quantity if same item exists
        for (CartItem item : cart) {
            if (item.getName().equals(name)) {
                item.setQuantity(item.getQuantity() + 1);
                return;
            }
        }

        // Add new item
        cart.add(new CartItem(name, price, 1));
    }

    public void removeFromCart(HttpSession session, int index) {
        List<CartItem> cart = getCart(session);
        if (index >= 0 && index < cart.size()) {
            cart.remove(index);
        }
    }

    public int getTotal(HttpSession session) {
        return getCart(session).stream()
                .mapToInt(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    public int getCartCount(HttpSession session) {
        return getCart(session).size();
    }
}