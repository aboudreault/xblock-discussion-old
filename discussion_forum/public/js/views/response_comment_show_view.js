// Generated by CoffeeScript 1.6.1
(function() {
  var _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    this.ResponseCommentShowView = (function(_super) {

      __extends(ResponseCommentShowView, _super);

      function ResponseCommentShowView() {
        var _this = this;
        this.edit = function(event) {
          return ResponseCommentShowView.prototype.edit.apply(_this, arguments);
        };
        this.updateModelDetails = function() {
          return ResponseCommentShowView.prototype.updateModelDetails.apply(_this, arguments);
        };
        this.renderFlagged = function() {
          return ResponseCommentShowView.prototype.renderFlagged.apply(_this, arguments);
        };
        this._delete = function(event) {
          return ResponseCommentShowView.prototype._delete.apply(_this, arguments);
        };
        return ResponseCommentShowView.__super__.constructor.apply(this, arguments);
      }

      ResponseCommentShowView.prototype.events = {
        "click .action-delete": function(event) {
          return this._delete(event);
        },
        "keydown .action-delete": function(event) {
          return DiscussionUtil.activateOnSpace(event, this._delete);
        },
        "click .action-edit": function(event) {
          return this.edit(event);
        },
        "keydown .action-edit": function(event) {
          return DiscussionUtil.activateOnSpace(event, this.edit);
        }
      };

      ResponseCommentShowView.prototype.tagName = "li";

      ResponseCommentShowView.prototype.initialize = function() {
        ResponseCommentShowView.__super__.initialize.call(this);
        return this.model.on("change", this.updateModelDetails);
      };

      ResponseCommentShowView.prototype.abilityRenderer = {
        can_delete: {
          enable: function() {
            return this.$(".action-delete").show();
          },
          disable: function() {
            return this.$(".action-delete").hide();
          }
        },
        editable: {
          enable: function() {
            return this.$(".action-edit").show();
          },
          disable: function() {
            return this.$(".action-edit").hide();
          }
        }
      };

      ResponseCommentShowView.prototype.render = function() {
        var params;
        this.template = _.template($("#response-comment-show-template").html());
        params = this.model.toJSON();
        this.$el.html(this.template(params));
        this.initLocal();
        this.delegateEvents();
        this.renderAttrs();
        this.renderFlagged();
        this.markAsStaff();
        this.$el.find(".timeago").timeago();
        this.convertMath();
        this.addReplyLink();
        return this;
      };

      ResponseCommentShowView.prototype.addReplyLink = function() {
        var html, name, p, _ref;
        if (this.model.hasOwnProperty('parent')) {
          name = (_ref = this.model.parent.get('username')) != null ? _ref : gettext("anonymous");
          html = "<a href='#comment_" + this.model.parent.id + "'>@" + name + "</a>:  ";
          p = this.$('.response-body p:first');
          return p.prepend(html);
        }
      };

      ResponseCommentShowView.prototype.convertMath = function() {
        var body;
        body = this.$el.find(".response-body");
        body.html(DiscussionUtil.postMathJaxProcessor(DiscussionUtil.markdownWithHighlight(body.text())));
        return MathJax.Hub.Queue(["Typeset", MathJax.Hub, body[0]]);
      };

      ResponseCommentShowView.prototype.markAsStaff = function() {
        if (DiscussionUtil.isStaff(this.model.get("user_id"))) {
          return this.$el.find("a.profile-link").after('<span class="staff-label">' + gettext('staff') + '</span>');
        } else if (DiscussionUtil.isTA(this.model.get("user_id"))) {
          return this.$el.find("a.profile-link").after('<span class="community-ta-label">' + gettext('Community TA') + '</span>');
        }
      };

      ResponseCommentShowView.prototype._delete = function(event) {
        return this.trigger("comment:_delete", event);
      };

      ResponseCommentShowView.prototype.renderFlagged = function() {
        var _ref;
        if ((_ref = window.user.id, __indexOf.call(this.model.get("abuse_flaggers"), _ref) >= 0) || (DiscussionUtil.isFlagModerator && this.model.get("abuse_flaggers").length > 0)) {
          this.$("[data-role=thread-flag]").addClass("flagged");
          this.$("[data-role=thread-flag]").removeClass("notflagged");
          this.$(".discussion-flag-abuse").attr("aria-pressed", "true");
          this.$(".discussion-flag-abuse").attr("data-tooltip", gettext("Misuse Reported, click to remove report"));
          return this.$(".discussion-flag-abuse .flag-label").html(gettext("Misuse Reported, click to remove report"));
        } else {
          this.$("[data-role=thread-flag]").removeClass("flagged");
          this.$("[data-role=thread-flag]").addClass("notflagged");
          this.$(".discussion-flag-abuse").attr("aria-pressed", "false");
          this.$(".discussion-flag-abuse").attr("data-tooltip", gettext("Report Misuse"));
          return this.$(".discussion-flag-abuse .flag-label").html(gettext("Report Misuse"));
        }
      };

      ResponseCommentShowView.prototype.updateModelDetails = function() {
        return this.renderFlagged();
      };

      ResponseCommentShowView.prototype.edit = function(event) {
        return this.trigger("comment:edit", event);
      };

      return ResponseCommentShowView;

    })(DiscussionContentView);
  }

}).call(this);
