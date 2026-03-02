package com.example.gusteasrestaurant.controller;

import com.example.gusteasrestaurant.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class  RestaurantController {

    private final CartService cartService;

    public RestaurantController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping({"/", "/index"}) // This handles BOTH the logo link and the Home link
    public String home(Model model, HttpSession session) {
        model.addAttribute("cartCount", cartService.getCart(session).size());
        model.addAttribute("cartTotal", cartService.getTotal(session));
        return "index";
    }


    @GetMapping("/menu")
    public String menu(Model model, HttpSession session) {
        System.out.println("DEBUG: MENU PAGE ACCESSED"); // ← you should see this

        model.addAttribute("cartCount", cartService.getCart(session).size());
        model.addAttribute("cartTotal", cartService.getTotal(session));

        // Tell the layout which fragment to insert from menu.html
        model.addAttribute("content", "menu :: content");

        return "fragments/layout";  // must match your actual file location
    }

    @GetMapping({"/cart", "/carts"}) // Handles both singular and plural
    public String viewCart(Model model, HttpSession session) {
        model.addAttribute("cartItems", cartService.getCart(session));
        model.addAttribute("cartTotal", cartService.getTotal(session));
        model.addAttribute("cartCount", cartService.getCart(session).size());
        return "cart";
    }

    @GetMapping({"/reservation", "/reservations"}) // Handles both singular and plural
    public String viewReservation(Model model, HttpSession session) {
        model.addAttribute("cartCount", cartService.getCart(session).size());
        return "reservation";
    }

    @GetMapping("/about")
    public String about(Model model, HttpSession session) {
        model.addAttribute("cartCount", cartService.getCart(session).size());
        return "about";
    }

    @GetMapping("/checkout")
    public String checkout(Model model, jakarta.servlet.http.HttpSession session) {
        model.addAttribute("cartCount", cartService.getCart(session).size());
        model.addAttribute("cartTotal", cartService.getTotal(session));
        return "checkout"; // This must match the filename checkout.html in your templates folder
    }

    @GetMapping("/contact")
    public String contact(Model model, HttpSession session) {
        model.addAttribute("cartCount", cartService.getCart(session).size());
        return "contact";
    }

    @PostMapping("/cart/add")
    public String addToCart(@RequestParam String name, @RequestParam int price, HttpSession session) {
        cartService.addToCart(session, name, price);
        return "redirect:/menu";
    }

    @PostMapping("/cart/remove")
    public String removeFromCart(@RequestParam int index, HttpSession session) {
        cartService.removeFromCart(session, index);
        return "redirect:/menu";
    }
}