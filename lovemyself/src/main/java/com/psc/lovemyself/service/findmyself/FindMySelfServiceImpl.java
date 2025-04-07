package com.psc.lovemyself.service.findmyself;

import com.psc.lovemyself.domain.findmyself.Connection;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.experience.*;
import com.psc.lovemyself.domain.findmyself.idea.*;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import com.psc.lovemyself.repository.findmyself.ConnectionRepository;
import com.psc.lovemyself.repository.findmyself.ExperienceRepository;
import com.psc.lovemyself.repository.findmyself.IdeaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FindMySelfServiceImpl implements FindMySelfService {

    private final ExperienceRepository experienceRepository;
    private final IdeaRepository ideaRepository;
    private final ConnectionRepository connectionRepository;

    @Transactional
    @Override
    public void saveCognition(CognitionDTO dto) {
        if (dto.getCognitionType() == CognitionType.EXPERIENCE) {
            Experience experience = dto.toExperience();
            experienceRepository.save(experience);

            if (dto.getConnections() != null) {
                for (Connection connection : dto.getConnections()) {
                    connection.setFromId(experience.getId());
                    connection.setFromCategory(experience.getCategory());
                    connectionRepository.save(connection);
                }
            }

        } else if (dto.getCognitionType() == CognitionType.IDEA) {
            Idea idea = dto.toIdea();
            ideaRepository.save(idea);

            if (dto.getConnections() != null) {
                for (Connection connection : dto.getConnections()) {
                    connection.setFromId(idea.getId());
                    connection.setFromCategory(idea.getCategory());
                    connectionRepository.save(connection);
                }
            }

        } else {
            throw new IllegalArgumentException("지원하지 않는 CognitionType입니다: " + dto.getCognitionType());
        }
    }



}
