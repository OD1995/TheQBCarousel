package mygroup.tqbcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mygroup.tqbcbackend.model.EmailTemplate;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate,String> {
    
    public EmailTemplate findByEmailTemplateID(long emailTemplateID);
}
