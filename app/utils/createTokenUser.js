const createTokenUser = (user) => {
    return {
      name: user.name,
      userId: user._id,
      role: user.role,
      email: user.email,
    };
  };
  
  const createTokenParticipant = (participant) => {
    return {
      fullName: participant.fullName,
      participantId: participant._id,
      email: participant.email,
    };
  };
  
  module.exports = { createTokenUser, createTokenParticipant };