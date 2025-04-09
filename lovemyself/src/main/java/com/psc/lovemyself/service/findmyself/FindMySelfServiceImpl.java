package com.psc.lovemyself.service.findmyself;

import com.psc.lovemyself.domain.findmyself.Cognition;
import com.psc.lovemyself.domain.findmyself.Connection;
import com.psc.lovemyself.domain.findmyself.ConnectionType;
import com.psc.lovemyself.domain.findmyself.ConnectionView;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.experience.*;
import com.psc.lovemyself.domain.findmyself.idea.*;
import com.psc.lovemyself.dto.findmyself.CognitionDTO;
import com.psc.lovemyself.dto.findmyself.ConnectionDTO;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import com.psc.lovemyself.repository.findmyself.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindMySelfServiceImpl implements FindMySelfService {

    private final ExperienceRepository experienceRepository;
    private final IdeaRepository ideaRepository;
    private final ConnectionRepository connectionRepository;
    private final ConnectionTypeRepository connectionTypeRepository;
    private final ConnectionViewRepository connectionViewRepository;
    private final CognitionRepository cognitionRepository;

    public void saveCognition(CognitionDTO cognitionDTO) {
        // 1. Cognition 조립
        Cognition cognition = cognitionDTO.toCognition();
        cognitionRepository.save(cognition);

        // 2. 연결 박스 흔들어보기
        List<ConnectionDTO> connectionDTOs = cognitionDTO.getConnections();
        if (connectionDTOs != null && !connectionDTOs.isEmpty()) {
            Long toId = connectionDTOs.get(0).getToId();
            if (toId != null) {
                for (ConnectionDTO dto : connectionDTOs) {
                    // 2-1. 필요한 조립 재료 확보
                    ConnectionType type = connectionTypeRepository.findByConnectionType(dto.getConnectionTypeName())
                            .orElseGet(() -> connectionTypeRepository.save(dto.toConnectionTypeEntity()));
                    ConnectionView view = connectionViewRepository.findByName(dto.getViewName())
                            .orElseGet(() -> connectionViewRepository.save(dto.toViewEntity(cognition)));

                    // 2-2. DTO한테 조립 맡기기
                    Connection connection = dto.toEntity(
                            cognition.getId(), cognition.getCategory(), type, view
                    );

                    // 2-3. 저장
                    connectionRepository.save(connection);
                }
            }

        }
    }




}
