package com.psc.lovemyself.dto.findmyself;

import com.psc.lovemyself.domain.findmyself.Cognition;
import com.psc.lovemyself.domain.findmyself.Connection;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import com.psc.lovemyself.domain.findmyself.experience.*;
import com.psc.lovemyself.domain.findmyself.idea.*;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class CognitionDTO {
    private String title;
    private String content;
    private Category category;  // 카테고리 (Review, Event, etc.)
    private LocalDate startDate;
    private LocalDate endDate;
    private CognitionType cognitionType;
    private List<ConnectionDTO> connections;

    public Cognition toCognition() {
        if (cognitionType == CognitionType.EXPERIENCE) {
            switch (category) {
                case REVIEW -> {
                    Review review = new Review();
                    fillCommonFields(review);
                    return review;
                }
                case EVENT -> {
                    Event event = new Event();
                    fillCommonFields(event);
                    return event;
                }
                case AWARENESS -> {
                    Awareness awareness = new Awareness();
                    fillCommonFields(awareness);
                    return awareness;
                }
                case PROJECT -> {
                    Project project = new Project();
                    fillCommonFields(project);
                    return project;
                }
                default -> throw new IllegalArgumentException("해당 category는 EXPERIENCE 타입에 해당하지 않습니다: " + category);
            }
        } else if (cognitionType == CognitionType.IDEA) {
            switch (category) {
                case INSPIRATION -> {
                    Inspiration inspiration = new Inspiration();
                    fillCommonFields(inspiration);
                    return inspiration;
                }
                case INSIGHT -> {
                    Insight insight = new Insight();
                    fillCommonFields(insight);
                    return insight;
                }
                case FRAMEWORK -> {
                    Framework framework = new Framework();
                    fillCommonFields(framework);
                    return framework;
                }
                case STUDY -> {
                    Study study = new Study();
                    fillCommonFields(study);
                    return study;
                }
                case MODEL -> {
                    Model model = new Model();
                    fillCommonFields(model);
                    return model;
                }
                default -> throw new IllegalArgumentException("해당 category는 IDEA 타입에 해당하지 않습니다: " + category);
            }
        } else {
            throw new IllegalArgumentException("알 수 없는 CognitionType: " + cognitionType);
        }
    }



    private void fillCommonFields(Review review) {
        review.setTitle(title);
        review.setContent(content);
        review.setStartDate(startDate);
        review.setEndDate(endDate);
        review.setCategory(Category.REVIEW);
        review.setCognitionType(CognitionType.EXPERIENCE);
    }

    private void fillCommonFields(Event event) {
        event.setTitle(title);
        event.setContent(content);
        event.setStartDate(startDate);
        event.setEndDate(endDate);
        event.setCategory(Category.EVENT);
        event.setCognitionType(CognitionType.EXPERIENCE);
    }

    private void fillCommonFields(Project project) {
        project.setTitle(title);
        project.setContent(content);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        project.setCategory(Category.PROJECT);
        project.setCognitionType(CognitionType.EXPERIENCE);
    }

    private void fillCommonFields(Awareness awareness) {
        awareness.setTitle(title);
        awareness.setContent(content);
        awareness.setStartDate(startDate);
        awareness.setEndDate(endDate);
        awareness.setCategory(Category.AWARENESS);
        awareness.setCognitionType(CognitionType.EXPERIENCE);
    }

    private void fillCommonFields(Inspiration inspiration) {
        inspiration.setTitle(title);
        inspiration.setContent(content);
        inspiration.setStartDate(startDate);
        inspiration.setEndDate(endDate);
        inspiration.setCategory(Category.INSPIRATION);
        inspiration.setCognitionType(CognitionType.IDEA);
    }

    private void fillCommonFields(Insight insight) {
        insight.setTitle(title);
        insight.setContent(content);
        insight.setStartDate(startDate);
        insight.setEndDate(endDate);
        insight.setCategory(Category.INSIGHT);
        insight.setCognitionType(CognitionType.IDEA);
    }

    private void fillCommonFields(Framework framework) {
        framework.setTitle(title);
        framework.setContent(content);
        framework.setStartDate(startDate);
        framework.setEndDate(endDate);
        framework.setCategory(Category.FRAMEWORK);
        framework.setCognitionType(CognitionType.IDEA);
    }

    private void fillCommonFields(Study study) {
        study.setTitle(title);
        study.setContent(content);
        study.setStartDate(startDate);
        study.setEndDate(endDate);
        study.setCategory(Category.STUDY);
        study.setCognitionType(CognitionType.IDEA);
    }

    private void fillCommonFields(Model model) {
        model.setTitle(title);
        model.setContent(content);
        model.setStartDate(startDate);
        model.setEndDate(endDate);
        model.setCognitionType(CognitionType.IDEA);
        model.setCategory(Category.MODEL);
    }


}
