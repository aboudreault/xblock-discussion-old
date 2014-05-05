// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.DiscussionThreadProfileView = (function(_super) {
      var expanded;

      __extends(DiscussionThreadProfileView, _super);

      function DiscussionThreadProfileView() {
        var _this = this;
        this.addComment = function() {
          return DiscussionThreadProfileView.prototype.addComment.apply(_this, arguments);
        };
        this.renderResponse = function(response) {
          return DiscussionThreadProfileView.prototype.renderResponse.apply(_this, arguments);
        };
        this.updateModelDetails = function() {
          return DiscussionThreadProfileView.prototype.updateModelDetails.apply(_this, arguments);
        };
        return DiscussionThreadProfileView.__super__.constructor.apply(this, arguments);
      }

      expanded = false;

      DiscussionThreadProfileView.prototype.events = {
        "click .vote-btn": function(event) {
          return this.toggleVote(event);
        },
        "keydown .vote-btn": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.toggleVote);
        },
        "click .action-follow": "toggleFollowing",
        "keydown .action-follow": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.toggleFollowing);
        },
        "click .expand-post": "expandPost",
        "click .collapse-post": "collapsePost"
      };

      DiscussionThreadProfileView.prototype.initLocal = function() {
        this.$local = this.$el.children(".discussion-article").children(".local");
        return this.$delegateElement = this.$local;
      };

      DiscussionThreadProfileView.prototype.initialize = function() {
        DiscussionThreadProfileView.__super__.initialize.call(this);
        return this.model.on("change", this.updateModelDetails);
      };

      DiscussionThreadProfileView.prototype.render = function() {
        var params;
        this.template = DiscussionUtil.getTemplate("_profile_thread");
        if (!this.model.has('abbreviatedBody')) {
          this.abbreviateBody();
        }
        params = $.extend(this.model.toJSON(), {
          expanded: this.expanded,
          permalink: this.model.urlFor('retrieve')
        });
        if (!this.model.get('anonymous')) {
          params = $.extend(params, {
            user: {
              username: this.model.username,
              user_url: this.model.user_url
            }
          });
        }
        this.$el.html(Mustache.render(this.template, params));
        this.initLocal();
        this.delegateEvents();
        this.renderVote();
        this.renderAttrs();
        this.$("span.timeago").timeago();
        this.convertMath();
        if (this.expanded) {
          this.renderResponses();
        }
        return this;
      };

      DiscussionThreadProfileView.prototype.updateModelDetails = function() {
        return this.renderVote();
      };

      DiscussionThreadProfileView.prototype.convertMath = function() {
        var element;
        element = this.$(".post-body");
        element.html(DiscussionUtil.postMathJaxProcessor(DiscussionUtil.markdownWithHighlight(element.text())));
        return MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
      };

      DiscussionThreadProfileView.prototype.renderResponses = function() {
        var _this = this;
        return DiscussionUtil.safeAjax({
          url: "/courses/" + $$course_id + "/discussion/forum/" + (this.model.get('commentable_id')) + "/threads/" + this.model.id,
          $loading: this.$el,
          success: function(data, textStatus, xhr) {
            var comments;
            _this.$el.find(".loading").remove();
            Content.loadContentInfos(data['annotated_content_info']);
            comments = new Comments(data['content']['children']);
            comments.each(_this.renderResponse);
            return _this.trigger("thread:responses:rendered");
          }
        });
      };

      DiscussionThreadProfileView.prototype.renderResponse = function(response) {
        var view;
        response.set('thread', this.model);
        view = new ThreadResponseView({
          model: response
        });
        view.on("comment:add", this.addComment);
        view.render();
        return this.$el.find(".responses").append(view.el);
      };

      DiscussionThreadProfileView.prototype.addComment = function() {
        return this.model.comment();
      };

      DiscussionThreadProfileView.prototype.edit = function() {};

      DiscussionThreadProfileView.prototype.abbreviateBody = function() {
        var abbreviated;
        abbreviated = DiscussionUtil.abbreviateString(this.model.get('body'), 140);
        return this.model.set('abbreviatedBody', abbreviated);
      };

      DiscussionThreadProfileView.prototype.expandPost = function(event) {
        this.expanded = true;
        this.$el.addClass('expanded');
        this.$el.find('.post-body').html(this.model.get('body'));
        this.convertMath();
        this.$el.find('.expand-post').css('display', 'none');
        this.$el.find('.collapse-post').css('display', 'block');
        this.$el.find('.post-extended-content').show();
        if (this.$el.find('.loading').length) {
          return this.renderResponses();
        }
      };

      DiscussionThreadProfileView.prototype.collapsePost = function(event) {
        this.expanded = false;
        this.$el.removeClass('expanded');
        this.$el.find('.post-body').html(this.model.get('abbreviatedBody'));
        this.convertMath();
        this.$el.find('.collapse-post').css('display', 'none');
        this.$el.find('.post-extended-content').hide();
        return this.$el.find('.expand-post').css('display', 'block');
      };

      return DiscussionThreadProfileView;

    })(DiscussionContentView);
  }

}).call(this);
