package com.psc.lovemyself.dto.findmyself;

import com.psc.lovemyself.domain.findmyself.Connection;
import com.psc.lovemyself.domain.findmyself.enums.Category;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import com.psc.lovemyself.domain.findmyself.experience.*;
import com.psc.lovemyself.domain.findmyself.idea.*;
import com.psc.lovemyself.domain.findmyself.enums.CognitionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CognitionDTO {
    private String title;
    private String content;
    private Category category;  // 카테고리 (Review, Event, etc.)
    private LocalDate startDate;
    private LocalDate endDate;
    private CognitionType cognitionType;
    private List<Connection> connections;

    public Experience toExperience() {
        return switch (category) {
            case REVIEW -> {
                var review = new Review();
                fillCommonFields(review);
                yield review;
            }
            case EVENT -> {
                var event = new Event();
                fillCommonFields(event);
                yield event;
            }
            case PROJECT -> {
                var project = new Project();
                fillCommonFields(project);
                yield project;
            }
            case AWARENESS -> {
                var awareness = new Awareness();
                fillCommonFields(awareness);
                yield awareness;
            }
            default -> throw new IllegalArgumentException("지원하지 않는 카테고리입니다: " + category);
        };
    }

    public Idea toIdea() {
        return switch (category) {
            case INSPIRATION -> {
                var inspiration = new Inspiration();
                fillCommonFields(inspiration);
                yield inspiration;
            }
            case INSIGHT -> {
                var insight = new Insight();
                fillCommonFields(insight);
                yield insight;
            }
            case FRAMEWORK -> {
                var framework = new Framework();
                fillCommonFields(framework);
                yield framework;
            }
            case STUDY -> {
                var study = new Study();
                fillCommonFields(study);
                yield study;
            }
            default -> throw new IllegalArgumentException("지원하지 않는 카테고리입니다: " + category);
        };
    }

    private void fillCommonFields(Review review) {
        review.setTitle(title);
        review.setContent(content);
        review.setStartDate(startDate);
        review.setEndDate(endDate);
        review.setCategory(Category.REVIEW);
    }

    private void fillCommonFields(Event event) {
        event.setTitle(title);
        event.setContent(content);
        event.setStartDate(startDate);
        event.setEndDate(endDate);
        event.setCategory(Category.EVENT);
    }

    private void fillCommonFields(Project project) {
        project.setTitle(title);
        project.setContent(content);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        project.setCategory(Category.PROJECT);
    }

    private void fillCommonFields(Awareness awareness) {
        awareness.setTitle(title);
        awareness.setContent(content);
        awareness.setStartDate(startDate);
        awareness.setEndDate(endDate);
        awareness.setCategory(Category.AWARENESS);
    }

    private void fillCommonFields(Inspiration inspiration) {
        inspiration.setTitle(title);
        inspiration.setContent(content);
        inspiration.setStartDate(startDate);
        inspiration.setEndDate(endDate);
        inspiration.setCategory(Category.INSPIRATION);
    }

    private void fillCommonFields(Insight insight) {
        insight.setTitle(title);
        insight.setContent(content);
        insight.setStartDate(startDate);
        insight.setEndDate(endDate);
        insight.setCategory(Category.INSIGHT);
    }

    private void fillCommonFields(Framework framework) {
        framework.setTitle(title);
        framework.setContent(content);
        framework.setStartDate(startDate);
        framework.setEndDate(endDate);
        framework.setCategory(Category.FRAMEWORK);
    }

    private void fillCommonFields(Study study) {
        study.setTitle(title);
        study.setContent(content);
        study.setStartDate(startDate);
        study.setEndDate(endDate);
        study.setCategory(Category.STUDY);
    }


}
