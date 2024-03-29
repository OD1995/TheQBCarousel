package mygroup.tqbcbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/_ah")
public class GoogleAppEngineController {
    
    @GetMapping("/start")
    public ResponseEntity<?> returnGAEResponse() {
        return ResponseEntity.ok().build();
    }
}
