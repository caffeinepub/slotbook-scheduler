import Principal "mo:core/Principal";

mixin () {
  var adminPrincipal : Principal = Principal.anonymous();

  func _getAdminPrincipal() : Principal {
    adminPrincipal
  };

  // Auto-initialize admin on first call if still anonymous
  func _autoInitAdmin(caller : Principal) {
    if (adminPrincipal.isAnonymous() and not caller.isAnonymous()) {
      adminPrincipal := caller;
    };
  };

  // Admin: get current admin principal
  public query func getAdmin() : async Principal {
    adminPrincipal
  };

  // Admin: transfer admin role to another principal (only current admin can do this)
  public shared ({ caller }) func setAdmin(newAdmin : Principal) : async Bool {
    if (adminPrincipal.isAnonymous()) {
      // First-time initialization: first caller becomes admin
      adminPrincipal := newAdmin;
      return true;
    };
    if (not Principal.equal(caller, adminPrincipal)) {
      return false;
    };
    adminPrincipal := newAdmin;
    true
  };

  // Public: check if the caller is the admin
  public query ({ caller }) func isAdmin() : async Bool {
    Principal.equal(caller, adminPrincipal)
  };

  // Admin: initialize self as admin (one-time setup)
  public shared ({ caller }) func initializeAdmin() : async Bool {
    if (not adminPrincipal.isAnonymous()) {
      return false; // already initialized
    };
    adminPrincipal := caller;
    true
  };
};
